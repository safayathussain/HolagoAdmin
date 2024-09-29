'use client'
import OtpInput from '@/components/global/input/OtpInput'
import PhoneInput from '@/components/global/input/PhoneInput'
import Button from '@/components/global/primaryButton/Button'
import PrimaryButton from '@/components/global/primaryButton/PrimaryButton'
import { FetchApi } from '@/utils/FetchApi'
import { useAuth } from '@/utils/functions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
    const [phone, setPhone] = useState(null)
    const [step, setStep] = useState(0)
    const [otp, setOtp] = useState('')
    const router = useRouter()
    const { auth, setAuth } = useAuth()
    const handleLogin = async () => {
        const payload = {
            phone_number: phone
        }
        const { data } = await FetchApi({ url: 'auth/api/tokenPair/', method: 'post', body: payload, isToast: true })
        toast(data.otp || '')
        if (data.code === 200) {
            setStep(1)
        }
    }
    const handleOtpVerify = async () => {
        const payload = {
            phone_number: phone,
            otp: otp
        }
        const { data } = await FetchApi({ url: 'auth/api/verify-otp/', method: 'post', body: payload, })
        if(data.user.role !== 'admin') return toast.error('You are not admin')
        if(data.user.id) toast.success('login successfully')
        
        setAuth(data.user)
        if (data.user) {
            router.push('/dashboard')
        }
    }
    const hadleResendCode = async () => {
        const payload = {
            phone_number: phone
        }
        const { data } = await FetchApi({ url: 'auth/api/tokenPair/', method: 'post', body: payload })
        if(data.code === 200){
            toast.success('OTP resend successfully')
        }else {
            toast.error('Something went wrong')

        }
    }
    return (

        <div>
            <p className='text-xl font-semibold text-center'>Login to your account</p>
            <div className='w-full mt-5 space-y-3'>
                {
                    step === 0 ? <>
                        <PhoneInput
                            placeholder='Phone Number'
                            onChange={(combinedValue) => setPhone(combinedValue)}
                            value={phone}
                        />
                        {/* <TextInput placeholder={'Enter Password'}></TextInput> */}
                        {/* <div className='flex justify-between items-center'>
                    <CheckBoxInput label={'Remember me'} id={'remC'} />
                    <Link href={''} className='underline text-sm font-medium'>Forgot Password?</Link>
                    </div> */}
                        <div className='mt-2 space-y-2'>
                            <Button variant='primary' className={'w-full'} onClick={handleLogin}>Login</Button>
                            {/* <Button variant='primary' className={'w-full'}>Login with OTP</Button> */}
                        </div>
                    </> : step === 1 && <>
                        <div>
                            <p className='text-xl text-center font-semibold'>Let’s verify your identity</p>
                            <p className='text-sm font-medium text-center'>Enter the 4-digit code you received</p>
                            <div className='my-5'>
                                <OtpInput name="otp" setOtp={setOtp} otp={otp} />
                            </div>
                            <Button className={'w-full mt-3'} onClick={handleOtpVerify}>Verify</Button>
                            <div className='flex justify-center'>
                                <button className='underline text-center mt-2' onClick={hadleResendCode}>Resend Code</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Page