'use client'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'

const OtpInput = ({className,  otp, setOtp}) => {
    return (
        <div className={`otp-field flex justify-center ${className}`}>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className='w-2'></span>}
                renderInput={(props) => <input {...props} />}
            />
        </div>
    )
}

export default OtpInput