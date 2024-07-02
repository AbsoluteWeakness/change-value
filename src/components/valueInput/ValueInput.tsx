import React, { useState } from "react"
import { InputNumber, Select } from "antd"
import'./css/ValueInput.scss'

type Cyrrency = {
    value: string;
    label: string;
}

const fiatCurrencies: Cyrrency[] = [
    { value: "RUB", label: 'Рубли' },
    { value: "USD", label: 'Доллары' },
    { value: "EUR", label: 'Евро' },
    { value: "CNY", label: 'Юань' },
    { value: "GBP", label: 'Британский фунт' },
    { value: "CAD", label: 'Канадский доллар' }
];

const cryptoCurrencies: Cyrrency[] = [
    { value: "BTC", label: 'Bitcoin' },
    { value: "ETH", label: "Ethereum" },
    { value: "XRP", label: "Ripple" },
    { value: "SOL", label: "Solana" },
    { value: "BNB", label: "Binance Coin" },
    { value: "USDT", label: 'Tether' },
    { value: "TON", label: 'Toncoin' },
    { value: "TRX", label: 'TRON' }
]

type valueProps = {
    value: string,
    currency:string,
    onValueChange: (value: number | null) => void,
    onCurrencyChange:(currency:string) => void,
}

const ValueInput: React.FC<valueProps> = ({ value, currency, onValueChange, onCurrencyChange }) => {
    
    const [selectedCurrency, setSelectedCurrency] = useState(currency);

    const currencyChange = (currency:string) => {
        setSelectedCurrency(currency)
        onCurrencyChange(currency)
    }

    return (
        <div className="valueInput">
            <InputNumber value={Number(value)} onChange={(newValue) => {
                if (newValue !== undefined) {
                    onValueChange(newValue) 
                }
            }} />

            <Select value={selectedCurrency} onChange={currencyChange}>
                {fiatCurrencies.map(currency => (
                    <Select.Option key={currency.value} value={currency.value}>{currency.label}</Select.Option>
                ))}
              
            </Select>
            
        </div>
    )
}

export default ValueInput