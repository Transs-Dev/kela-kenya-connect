export const PHONE_NUMBER = '+254726285869';
export const PHONE_DISPLAY = '+254 726 285869';
export const EMAIL = 'asumptam@yahoo.com';

export const openWhatsApp = (
  message = 'Hi! I would like to learn more about Kela Assistance Services.'
) => {
  const url = `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export const callPhone = () => {
  window.location.href = `tel:${PHONE_NUMBER}`;
};
