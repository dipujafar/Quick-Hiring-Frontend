'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImSpinner2 } from 'react-icons/im';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Singin } from '@/lib/actions/auth.action';
import AnimatedArrow from '@/components/animation/AnimatedArrow';

// --------------------
// ZOD SCHEMA
// --------------------
const formSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormType = z.infer<typeof formSchema>;

const LoginForm = () => {
    const router = useRouter();
    const nextRoute = useSearchParams().get('next');

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<FormType>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'admin@gmail.com',
            password: '123456',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: FormType) => {
        try {
            const res = await Singin(JSON.stringify(data));

            toast.success(res?.message || 'Login Success');

            form.reset();
            router.replace(nextRoute || '/admin/jobs');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <h2 className="text-xl font-medium">Login as Admin!</h2>
                    <p className="text-sm text-muted-foreground">
                        Please enter your email and password
                    </p>
                </div>

                {/* EMAIL */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" {...field} className='py-5 bg-gray-100 rounded-none' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* PASSWORD */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password *</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        {...field}
                                        className='py-5 bg-gray-100 rounded-none'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <IoEyeOutline className="text-xl" />
                                        ) : (
                                            <IoEyeOffOutline className="text-xl" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* SUBMIT */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center gap-2 bg-primary-color hover:bg-primary-color/90 cursor-pointer group rounded-none py-5"
                >
                    {isSubmitting && <ImSpinner2 className="animate-spin" />}
                    {isSubmitting ? 'Loading...' : 'Sign In'}
                    <AnimatedArrow />
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;