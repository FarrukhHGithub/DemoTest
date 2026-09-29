import React from 'react';
import moment from 'moment';

const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, data, selectTime }) => {
    const { nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, paymentType, paymentMethod } = selectValue;

    const handleCheck = () => {
        setIsChecked(!isCheck);
    };

    const price = data?.price ? data.price : 60;
    const formattedSelectedTime = moment(selectTime, 'HH:mm:ss').format('hh:mm A');
    const vat = (15 / 100) * (Number(price));

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <div className="rounded p-3" style={{ background: "#f8f9fa" }}>
                        <div className='row'>
                            <div className="col-md-6 mb-2">
                                <label className="payment-radio credit-card-option">
                                    <input 
                                        type="radio"
                                        name="paymentType"
                                        value="creditCard"
                                        onChange={handleChange}
                                        checked={paymentType === 'creditCard'}
                                    />
                                    <span className="ms-2"></span>
                                    Credit card
                                </label>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="payment-radio credit-card-option">
                                    <input 
                                        type="radio"
                                        name="paymentType"
                                        value="cash"
                                        onChange={handleChange}
                                        checked={paymentType === 'cash'}
                                    />
                                    <span className="ms-2"></span>
                                    Cash
                                </label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="card_name">Name on Card</label>
                                    <input className="form-control" id="card_name" value={nameOnCard || ''} type="text" onChange={handleChange} name='nameOnCard' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="card_number">Card Number</label>
                                    <input className="form-control" id="card_number" value={cardNumber || ''} placeholder="1234  5678  9876  5432" type="number" onChange={handleChange} name='cardNumber' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="expiry_month">Expiry Month</label>
                                    <input className="form-control" id="expiry_month" value={expiredMonth || ''} placeholder="MM" type="number" onChange={handleChange} name='expiredMonth' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="expiry_year">Expiry Year</label>
                                    <input className="form-control" id="expiry_year" value={cardExpiredYear || ''} placeholder="YY" type="number" onChange={handleChange} name='cardExpiredYear' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="cvv">CVV</label>
                                    <input className="form-control" id="cvv" type="number" value={cvv || ''} onChange={handleChange} name='cvv' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-3 mb-3">
                            <div>
                                <input 
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    onChange={handleChange}
                                    checked={paymentMethod === 'paypal'}
                                />
                                <span className="checkmark ms-3"></span>
                                Paypal
                            </div>
                            <div>
                                <input 
                                    type="radio"
                                    name="paymentMethod"
                                    value="payoneer"
                                    onChange={handleChange}
                                    checked={paymentMethod === 'payoneer'}
                                />
                                <span className="checkmark ms-3"></span>
                                Payoneer
                            </div>
                        </div>
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms_accept" className='me-2'
                                    checked={isCheck}
                                    onChange={handleCheck} 
                                />
                                <label htmlFor="terms_accept"> I have read and accept <a className='text-primary' style={{ cursor: 'pointer', textDecoration: 'none' }}>Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
