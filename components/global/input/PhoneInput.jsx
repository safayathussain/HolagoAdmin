import React from 'react';
import phoneCountry from '@/public/data/phoneCountry.json';

const PhoneInput = ({ label, id, name, type = 'text', className, placeholder, rounded = 'xl', onChange = () => {}, value, ...etc }) => {
    const [countryCode, setCountryCode] = React.useState('+88'); // Default country code (for example, Bangladesh)
    const [phoneNumber, setPhoneNumber] = React.useState('');

    React.useEffect(() => {
        // Combine country code and phone number and notify the parent component
        onChange(`${countryCode}${phoneNumber}`);
    }, [countryCode, phoneNumber, onChange]);

    return (
        <div>
            <div>
                <label htmlFor={id} className="block text-gray-800 font-medium text-sm">
                    {label}
                </label>
                <div className="mt-0.5 flex items-center">
                    <div className={`border border-r-0 rounded-l-xl !rounded-l-${rounded} p-[8px]`}>
                        <select
                            name="code"
                            id={`code-${id}`}
                            className="text-sm focus:outline-none bg-[#F6F6F6] rounded-full"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            {phoneCountry.map((item) => (
                                <option key={item.shortname} value={item.phone_code}>
                                    {item.shortname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        placeholder={placeholder}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck="false"
                        className={`block w-full bg-white placeholder:text-sm md:placeholder:text-base focus:outline-none rounded-${rounded} p-2 border-[1.5px] border-l-0 rounded-l-none border-gray-200  focus:outline-none  focus:ring-0 ${className}`}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        {...etc}
                    />
                </div>
            </div>
        </div>
    );
};

export default PhoneInput;
