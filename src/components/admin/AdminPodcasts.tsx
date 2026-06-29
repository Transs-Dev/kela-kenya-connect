import { useEffect, useRef, useState } from "react";
import { Trash2, Upload, Mic, Square, Music2, Play, Pause, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { usePodcasts } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { uploadToStorage, logActivity } from "@/lib/adminApi";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// =================== Studio (Record + Background music with ducking) ===================
function Studio({ onPublished }: { onPublished: () => void }) {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgVolume, setBgVolume] = useState(0.6);
  const [duckLevel, setDuckLevel] = useState(0.15);
  const [duckThreshold, setDuckThreshold] = useState(18);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [meterLevel, setMeterLevel] = useState(0);
  const [isDucking, setIsDucking] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const bgAudioElRef = useRef<HTMLAudioElement | null>(null);
  const bgGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<any>(null);

  const cleanup = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    if (bgAudioElRef.current) { bgAudioElRef.current.pause(); bgAudioElRef.current.currentTime = 0; }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
    }
    audioCtxRef.current = null;
    bgGainRef.current = null;
    analyserRef.current = null;
  };

  useEffect(() => () => cleanup(), []);

  const start = async () => {
    if (recording) return;
    setPreviewUrl(null); setPreviewBlob(null); setElapsed(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      micStreamRef.current = stream;
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AC();
      audioCtxRef.current = ctx;
      const dest = ctx.createMediaStreamDestination();
      // Mic chain
      const micSrc = ctx.createMediaStreamSource(stream);
      const micGain = ctx.createGain(); micGain.gain.value = 1;
      const analyser = ctx.createAnalyser(); analyser.fftSize = 512;
      analyserRef.current = analyser;
      micSrc.connect(analyser);
      micSrc.connect(micGain).connect(dest);
      // BG music chain
      if (bgFile) {
        const url = URL.createObjectURL(bgFile);
        const el = new Audio(url);
        el.loop = true; el.crossOrigin = "anonymous";
        bgAudioElRef.current = el;
        const bgSrc = ctx.createMediaElementSource(el);
        const bgGain = ctx.createGain(); bgGain.gain.value = bgVolume;
        bgGainRef.current = bgGain;
        bgSrc.connect(bgGain).connect(dest);
        await el.play();
      }
      // Recorder
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const rec = new MediaRecorder(dest.stream, { mimeType: mime });
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mime });
        setPreviewBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
      };
      rec.start(250);
      recRef.current = rec;
      setRecording(true); setPaused(false);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);

      // Volume ducking loop
      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) { const v = data[i] - 128; sum += v * v; }
        const rms = Math.sqrt(sum / data.length);
        setMeterLevel(rms);
        if (bgGainRef.current && ctx) {
          const speaking = rms > duckThreshold;
          setIsDucking(speaking);
          const target = speaking ? bgVolume * duckLevel : bgVolume;
          bgGainRef.current.gain.setTargetAtTime(target, ctx.currentTime, 0.08);
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (e: any) {
      toast({ title: "Microphone access denied", description: e.message, variant: "destructive" });
      cleanup();
    }
  };

  const togglePause = () => {
    const rec = recRef.current;
    if (!rec) return;
    if (rec.state === "recording") {
      rec.pause(); setPaused(true);
      bgAudioElRef.current?.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (rec.state === "paused") {
      rec.resume(); setPaused(false);
      bgAudioElRef.current?.play().catch(() => {});
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    }
  };

  const stop = () => {
    recRef.current?.stop();
    setRecording(false); setPaused(false);
    cleanup();
  };

  const publish = async () => {
    if (!previewBlob) return toast({ title: "Record or pick something first" });
    if (!title.trim()) return toast({ title: "Title required", variant: "destructive" });
    setPublishing(true);
    try {
      const file = new File([previewBlob], `studio-${Date.now()}.webm`, { type: previewBlob.type });
      const url = await uploadToStorage(file, "podcasts");
      const { data, error } = await supabase.from("podcasts").insert({
        title, description, audio_url: url, duration_seconds: elapsed, is_published: true,
      }).select().single();
      if (error) throw error;
      await logActivity("publish", "podcasts", data?.id, { title });
      toast({ title: "Podcast published" });
      setTitle(""); setDescription(""); setElapsed(0); setPreviewBlob(null); setPreviewUrl(null);
      onPublished();
    } catch (e: any) {
      toast({ title: "Publish failed", description: e.message, variant: "destructive" });
    } finally {
      setPublishing(false);
    }
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-background">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Recording Studio</h3>
          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
            {recording ? (paused ? "Paused" : "Live") : "Idle"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="rounded-xl bg-background border p-4 text-center">
              <div className="text-4xl font-mono font-bold text-primary">{mm}:{ss}</div>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all ${isDucking ? "bg-amber-500" : "bg-green-500"}`}
                  style={{ width: `${Math.min(100, (meterLevel / 50) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] mt-1 text-muted-foreground">Mic level {isDucking ? "· ducking music" : ""}</p>
            </div>
            <div className="flex gap-2">
              {!recording ? (
                <Button onClick={start} className="flex-1"><Mic className="w-4 h-4 mr-2" />Start</Button>
              ) : (
                <>
                  <Button onClick={togglePause} variant="outline" className="flex-1">
                    {paused ? <><Play className="w-4 h-4 mr-2" />Resume</> : <><Pause className="w-4 h-4 mr-2" />Pause</>}
                  </Button>
                  <Button onClick={stop} variant="destructive" className="flex-1"><Square className="w-4 h-4 mr-2" />Stop</Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-semibold flex items-center gap-1"><Music2 className="w-3 h-3" />Background music (optional)</span>
              <input
                type="file"
                accept="audio/*"
                disabled={recording}
                onChange={(e) => setBgFile(e.target.files?.[0] ?? null)}
                className="mt-1 text-xs"
              />
              {bgFile && <p className="text-[10px] text-muted-foreground mt-1 truncate">{bgFile.name}</p>}
            </label>
            <div>
              <label className="text-xs">Music volume: {(bgVolume * 100).toFixed(0)}%</label>
              <Slider value={[bgVolume * 100]} onValueChange={(v) => setBgVolume(v[0] / 100)} max={100} step={1} />
            </div>
            <div>
              <label className="text-xs">Duck to: {(duckLevel * 100).toFixed(0)}% when speaking</label>
              <Slider value={[duckLevel * 100]} onValueChange={(v) => setDuckLevel(v[0] / 100)} max={100} step={1} />
            </div>
            <div>
              <label className="text-xs">Speech sensitivity: {duckThreshold}</label>
              <Slider value={[duckThreshold]} onValueChange={(v) => setDuckThreshold(v[0])} min={5} max={60} step={1} />
            </div>
          </div>
        </div>

        {previewUrl && (
          <div className="rounded-xl border bg-background p-4 space-y-3">
            <p className="text-sm font-semibold">Preview & publish</p>
            <audio src={previewUrl} controls className="w-full" />
            <Input placeholder="Episode title *" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Short description (what it's about)" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={publish} disabled={publishing} className="w-full">
              <Save className="w-4 h-4 mr-2" />{publishing ? "Publishing…" : "Publish to website"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// =================== Upload existing recording ===================
function UploadEpisode({ onDone }: { onDone: () => void }) {
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!audio) return toast({ title: "Pick an audio file", variant: "destructive" });
    if (!title.trim()) return toast({ title: "Title required", variant: "destructive" });
    setBusy(true);
    try {
      const audio_url = await uploadToStorage(audio, "podcasts");
      let cover_url: string | null = null;
      if (cover) cover_url = await uploadToStorage(cover, "podcasts/covers");
      const { data, error } = await supabase.from("podcasts").insert({
        title, description, audio_url, cover_url, is_published: true,
      }).select().single();
      if (error) throw error;
      await logActivity("create", "podcasts", data?.id, { title });
      toast({ title: "Episode published" });
      setAudio(null); setCover(null); setTitle(""); setDescription("");
      onDone();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Upload Pre-recorded Episode</h3>
        </div>
        <Input placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className="block text-sm">
          <span className="font-semibold">Audio file *</span>
          <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-xs" />
          {audio && <p className="text-[10px] text-muted-foreground">{audio.name}</p>}
        </label>
        <label className="block text-sm">
          <span className="font-semibold">Cover image (optional)</span>
          <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-xs" />
        </label>
        <Button onClick={submit} disabled={busy} className="w-full">{busy ? "Uploading…" : "Publish"}</Button>
      </CardContent>
    </Card>
  );
}

// =================== Main ===================
export function AdminPodcasts() {
  const { data: episodes = [] } = usePodcasts();
  const qc = useQueryClient();

  const refresh = () => qc.invalidateQueries({ queryKey: ["podcasts"] });

  const togglePublish = async (p: any) => {
    await supabase.from("podcasts").update({ is_published: !p.is_published }).eq("id", p.id);
    await logActivity(p.is_published ? "unpublish" : "publish", "podcasts", p.id);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    await supabase.from("podcasts").delete().eq("id", id);
    await logActivity("delete", "podcasts", id);
    refresh();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Podcasts</h2>
        <p className="text-muted-foreground">Record live in-studio with background music ducking, or upload an existing episode. Everything is saved in the cloud.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Studio onPublished={refresh} />
        <UploadEpisode onDone={refresh} />
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">Episodes ({episodes.length})</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {episodes.map((p: any) => (
            <Card key={p.id} className="border-none shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start gap-3">
                  {p.cover_url ? (
                    <img src={p.cover_url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{p.title}</p>
                    {p.description && <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>}
                  </div>
                </div>
                <audio src={p.audio_url} controls className="w-full" preload="none" />
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <Switch checked={p.is_published} onCheckedChange={() => togglePublish(p)} />
                    {p.is_published ? "Published" : "Draft"}
                  </label>
                  <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {episodes.length === 0 && <p className="text-sm text-muted-foreground">No episodes yet.</p>}
        </div>
      </div>
    </div>
  );
}
