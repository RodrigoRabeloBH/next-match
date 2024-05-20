'use client'

import { signOutUser } from '@/app/actions/authActions'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

type Props = {
    user: Session['user']
}
export default function UserMenu({ user }: Props) {
    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar
                    as='button'
                    className='transition-transform bg-pink-400'
                    name={user?.name || 'user avatar'}
                    size='sm'
                    src={user?.image || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='User actions menu'>
                <DropdownSection showDivider>
                    <DropdownItem
                        isReadOnly
                        as='span'
                        className='h-14 flex flex-row'
                        aria-label='username'>
                        Welcome {user?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem as={Link} href='/members/edit'>
                    Edit profile
                </DropdownItem>
                <DropdownItem color='danger' onClick={async () => signOutUser()}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}