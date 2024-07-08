import React, { useState } from "react"
import { InputNumber, Select } from "antd"
import * as images from '../../assets/images/loadImages';

import './css/ValueInput.scss'

type Currency = {
    value: string;
    label: string;
    img: string;
}

const fiatCurrencies: Currency[] = [
    { value: "RUB", label: 'Рубли', img: images.rubImg},
    { value: "USD", label: 'Доллары', img:images.usdImg },
    { value: "EUR", label: 'Евро', img:images.euroImg},
    { value: "CNY", label: 'Юань', img:images.yuanImg},
    { value: "TRY", label: 'Лира', img: images.liraImg },
    { value: "MNT", label: 'Тугрик', img: images.tugrikImg },
    { value: "AED", label: 'Дирхам', img: images.dirhamImg },
    { value: "INR", label: 'Рупий', img: images.rupieesImg },
    { value: "KZT", label: 'Тенге', img: images.tengeImg },
    { value: "KRW", label: 'Вона', img: images.wonImg }
];

const cryptoCurrencies: Currency[] = [
    { value: "BTC", label: 'Bitcoin', img: images.btcImg },
    { value: "ETH", label: "Ethereum", img: images.ethImg},
    { value: "XRP", label: "Ripple", img: images.xrpImg },
    { value: "SOL", label: "Solana", img: images.solImg},
    { value: "BNB", label: "Binance Coin", img: images.bnbImg },
    { value: "USDT", label: 'Tether', img: images.usdtImg},
    { value: "TON", label: 'Toncoin', img: images.tonImg },
    { value: "TRX", label: 'TRON', img: images.trxImg }
];

const allCurrencies = [...fiatCurrencies, ...cryptoCurrencies]

type valueProps = {
    value: string,
    currency:string,
    onValueChange: (value: number | null) => void,
    onCurrencyChange:(currency:string) => void,
}

const ValueInput: React.FC<valueProps> = ({value, currency, onValueChange, onCurrencyChange }) => {
    
    const [selectedCurrency, setSelectedCurrency] = useState(currency) ;

    const currencyChange = (newValue: string) => {
        setSelectedCurrency(newValue)
        onCurrencyChange(newValue)
    }

    return (
       
        <div className="valueInput">
            
            <InputNumber  value={Number(value)} onChange={(newValue) => {
                if (newValue !== undefined) {
                    onValueChange(newValue) 
                }
            }} />
          

            <Select value={selectedCurrency} onChange={currencyChange}>
                {allCurrencies.map(currency => (
                    <Select.Option
                            key={currency.value} value={currency.value}> 
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {currency.label}
                         <img src={currency.img} alt={currency.label} style={{ width: 25, height: 25, marginLeft: 10 }} /> 

                        </div>
                       
                    </Select.Option>
                ))}
            </Select>
            
        </div>
    )
}

export default ValueInput