import { useState } from 'react';

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface PaymentDetails {
  cardNumber: string;
  expDate: string;
  cvv: string;
}

const useCheckoutForm = () => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '', 
  });

  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckoutSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.country || !shippingAddress.zip) {
      alert('Please fill out all shipping address fields');
      return;
    }

    if (!paymentDetails.cardNumber || !paymentDetails.expDate || !paymentDetails.cvv) {
      alert('Please fill out all payment details');
      return;
    }

    console.log('Order submitted:', { shippingAddress, paymentMethod, paymentDetails });
    setOrderSuccess(true);  // Example of setting success after submitting
  };

  return {
    shippingAddress,
    paymentMethod,
    paymentDetails,
    orderSuccess,
    handleShippingChange,
    handlePaymentChange,
    handlePaymentMethodChange,
    handleCheckoutSubmit,
    isFormValid: shippingAddress.name && shippingAddress.street && paymentDetails.cardNumber && paymentDetails.expDate
  };
};

export default useCheckoutForm;
