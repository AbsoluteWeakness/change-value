import React, { useState } from "react"
import axios from "axios";
import ValueInput from "../valueInput/ValueInput";

const Converter: React.FC = () => {

    const [value, setValue] = useState('');
    const [fromCurrency, setFromCurrency] = useState<string>('RUB')
    const [toCurrency, setToCurrency] = useState<string>('USD')
    const [convertedValue, setConvertedValue] = useState<string>('')

    const valueChange = async (value: number | null) => {
        setValue(value?.toString() ?? '');
        if (value !== null) {
            const convertedAmount = await convertCurrency(fromCurrency, toCurrency, value);
            setConvertedValue(convertedAmount.toFixed(2));
        }
    };


    const fromCurrencyChange = async (currency: string) => {
        setFromCurrency(currency);
        if (value !== '') {
            const convertedAmount = await convertCurrency(currency, toCurrency, Number(value));
            setConvertedValue(convertedAmount.toFixed(2));
        }
    };


    const toCurrencyChange = async (currency: string) => {
        setToCurrency(currency);
        if (value !== '') {
            const convertedAmount = await convertCurrency(fromCurrency, currency, Number(value));
            setConvertedValue(convertedAmount.toFixed(2));
        }
    };

    const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: number) => {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rates = response.data.rates;
        const exchangeRate = rates[toCurrency];
        const convertedAmount = amount * exchangeRate;
        return convertedAmount;
    };

    return (
        <div>
           
            <ValueInput
                value={value}
                currency={fromCurrency}
                onValueChange={valueChange}
                onCurrencyChange={fromCurrencyChange}

            />  

            <ValueInput
                value={convertedValue}
                currency={toCurrency}
                onValueChange={() => {}}
                onCurrencyChange={toCurrencyChange}
                />
            
        </div>
    )
}
export default Converter