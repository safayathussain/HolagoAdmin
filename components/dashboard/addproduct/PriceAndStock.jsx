import TextInput from '@/components/global/input/TextInput'
import ToogleInput from '@/components/global/input/ToogleInput'
import React from 'react'

const PriceAndStock = ({ items = [] }) => {
  return (
    <div>
      <div className="py-5">
        <p>Price & Stock</p>
        <div className='border rounded-xl mt-3'>
          {/* header */}
          <div>
            <div className='flex p-3 rounded-b-none border-b bg-[#F9FAFB] gap-2 rounded-xl w-full'>
              <p className='w-2/12'>Size</p>
              <p className='w-3/12'>Quantity</p>
              <p className='w-5/12'>Barcode</p>
              <p className='w-2/12'>Available</p>
            </div>
          </div>
          <div className='divide-y'>
            {
              items.map((item, i) =>
                <div key={i} className='p-3 flex w-full gap-2'>
                  <p className='w-2/12 font-semibold'>{item}</p>
                  <div className={'w-3/12'}>
                    <TextInput className={'w-full'} name={`inventory_qty_${i}`} defaultValue={0} type='number'/>
                  </div>
                  <div className={'w-5/12'}>
                    <TextInput className={'w-full'} name={`inventory_barcode_${i}`} defaultValue={0} type='number'/>
                  </div>
                  <div className={'w-2/12'}>
                    <ToogleInput className={'w-full'} name={`inventory_available_${i}`} defaultChecked={true}/>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceAndStock