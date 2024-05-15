import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { UserButton, SignedIn } from '@clerk/nextjs'
import { SignedOut } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex item1-center gap-1'>
        <Image
        src='/icons/logo.svg'
        width={40}
        height={40}
        alt='Bridge Logo'
        className='max-sm:size-10'
        />
          <p className='pl-3 text-[26px] font-extrabold text-white max-sm:hidden'>
            Bridge
          </p>
          <p className='pt-2 pl-1 text-[16px] text-white max-sm:hidden align-middle'>
            Connecting people
          </p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar