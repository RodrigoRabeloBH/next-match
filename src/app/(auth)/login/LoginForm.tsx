'use client'
import { signInUser } from '@/app/actions/authActions';
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { GiEyeTarget, GiEyelashes, GiPadlock } from 'react-icons/gi'
import { toast } from 'react-toastify';

export default function LoginForm() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } =
        useForm<LoginSchema>({
            resolver: zodResolver(loginSchema),
            mode: 'onTouched'
        });

    const onsubmit = async (data: LoginSchema) => {
        const result = await signInUser(data);

        if (result.status === 'success') {
            router.push('/members');
            router.refresh();
        } else {
            toast.error(result.error as string);
        }
    }

    return (
        <Card className='w-75% md:w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-pink-400'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-neutral-500'>
                        Welcome back to NextMatch
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form autoComplete='off' onSubmit={handleSubmit(onsubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            autoComplete='off'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            autoComplete='off'
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}>
                                    {isVisible ? (
                                        <GiEyeTarget
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <GiEyelashes
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            type='submit'
                            className='bg-pink-400 text-white'>
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
