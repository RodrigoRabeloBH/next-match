import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/components/members/MemberSidebar';
import { Card } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function Layout({ children, params }
    : { children: ReactNode, params: { userId: string } }) {
    const member = await getMemberByUserId(params.userId);

    if (!member)
        return notFound();

    const basePath = `/members/${member.userId}`;

    const navLinks = [
        { name: 'Profile', href: `${basePath}` },
        { name: 'Photos', href: `${basePath}/photos` },
        { name: 'Chat', href: `${basePath}/chat` }
    ];

    return (
        <div className="container mx-auto p-5">
            <div className='xl:grid grid-cols-12 gap-5'>
                <div className='col-span-3 h-[60vh] md:h-[80vh]'>
                    <MemberSidebar member={member} navLinks={navLinks} />
                </div>
                <div className='col-span-9'>
                    <Card className='w-full mt-10 h-[80vh]'>
                        {children}
                    </Card>
                </div>
            </div>
        </div>
    )
}
