import React, { useState } from "react"
import axios from "axios";

import ValueInput from "../valueInput/ValueInput";

import './css/converter.scss'

const CRYPTO_API_KEY = '440CDA30-79A4-4F07-B22C-CEEFBFE51442';
const FIAT_API_URL = 'https://api.exchangerate-api.com/v4/latest/';
const CRYPTO_API_URL = 'https://rest.coinapi.io/v1/exchangerate'

const Converter: React.FC = () => {

    const [value, setValue] = useState('');
    const [fromCurrency, setFromCurrency] = useState<string>('RUB');
    const [toCurrency, setToCurrency] = useState<string>('USD');
    const [convertedFiatValue, setConvertedFiatValue] = useState<string>('');


    const valueChange = async (value: number | null) => {
        setValue(value?.toString() ?? '');
        if (value !== null) {
            const convertedAmount = await convertCurrency(fromCurrency, toCurrency, value);
            setConvertedFiatValue(convertedAmount.toFixed(3));
        }
    };


    const fromCurrencyChange = async (currency: string) => {
        setFromCurrency(currency);
        if (value !== '') {
            const convertedAmount = await convertCurrency(currency, toCurrency, Number(value));
            setConvertedFiatValue(convertedAmount.toFixed(3));
        }
    };


    const toCurrencyChange = async (currency: string) => {
        setToCurrency(currency);
        if (value !== '') {
            const convertedAmount = await convertCurrency(fromCurrency, currency, Number(value));
            setConvertedFiatValue(convertedAmount.toFixed(3));
        }
    };

    const valueSwap = async () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        console.log(document.getElementById('1'))

        if (value !== '') {
            const convertedAmount = await convertCurrency(toCurrency, fromCurrency, Number(value));
            setConvertedFiatValue(convertedAmount.toFixed(3));
        }
    }

    const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: number) => {
        let exchangeRate: number;

        if (!isCrypto(fromCurrency) && !isCrypto(toCurrency)) {
            const response = await axios.get(`${FIAT_API_URL}${fromCurrency}`);
            exchangeRate = response.data.rates[toCurrency];
        } else if (isCrypto(fromCurrency) && isCrypto(toCurrency)) {     
                const response = await axios.get(`${CRYPTO_API_URL}/${fromCurrency}/${toCurrency}`, {
                    headers: { 'X-CoinAPI-Key': CRYPTO_API_KEY }
                });
                exchangeRate = response.data.rate;
            } else {
                const cryptoCurrency = isCrypto(fromCurrency) ? fromCurrency : toCurrency;
                const fiatCurrency = isCrypto(fromCurrency) ? toCurrency : fromCurrency;
                const response = await axios.get(`${CRYPTO_API_URL}/${cryptoCurrency}/${fiatCurrency}`, {
                    headers: { 'X-CoinAPI-Key': CRYPTO_API_KEY }
                });
                exchangeRate = response.data.rate;

                if (isCrypto(toCurrency)) {
                    exchangeRate = 1 / exchangeRate;
                }
        }
    
        const convertedAmount = amount * exchangeRate;
        return convertedAmount;
    };

    const isCrypto = (currency: string) => {
        const cryptoCurrencies = ['BTC', 'ETH', 'XRP', 'SOL', 'BNB', 'USDT', 'TON', 'TRX'];
        return cryptoCurrencies.includes(currency.toUpperCase());
    };

    return (
        <div className="currency-converter">
            <div className="input-group">

                <ValueInput
                    value={value}
                    currency={fromCurrency}
                    onValueChange={valueChange}
                    onCurrencyChange={fromCurrencyChange}
                />

                <button onClick={valueSwap} className="arrow">⇄</button>

                <ValueInput
                    value={convertedFiatValue}
                    currency={toCurrency}
                    onValueChange={() => { }}
                    onCurrencyChange={toCurrencyChange}
                />

            </div>

          
        </div>
    )
}
export default Converter