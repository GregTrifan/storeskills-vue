<script setup lang="ts">
import { useLoginForm } from '@/composables/useLoginForm';
import { CheckCircle2, XCircle } from 'lucide-vue-next';
import { SpinnerSmall } from '@/components/spinners';

const { 
  form, 
  errors, 
  error, 
  success, 
  successMessage, 
  isLoading, 
  performLogin, 
  onInput 
} = useLoginForm();

const handleSubmit = async (e: Event): Promise<void> => {
  e.preventDefault();
  await performLogin();
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Enter your credentials to access your account
                </p>
            </div>



            <form class="mt-8 space-y-6" @submit="handleSubmit" autocomplete="on">
                <div class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input id="username" v-model="form.username" type="text"
                            autocomplete="username" :class="[
                                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
                                errors.username
                                    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                            ]" :disabled="isLoading" @input="onInput('username')" />
                        <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                            {{ errors.username }}
                        </p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                        </div>
                        <input id="password" v-model="form.password" type="password" autocomplete="current-password"
                            :class="[
                                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
                                errors.password
                                    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                            ]" :disabled="isLoading" @input="onInput('password')" />
                        <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                            {{ errors.password }}
                        </p>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        :disabled="isLoading">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <SpinnerSmall v-if="isLoading" />
                        </span>
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </div>
            </form>
            <div v-if="error || success" class="mb-6 rounded-md p-4 transition-all duration-300 ease-in-out" :class="{
                'bg-green-50 border border-green-200': success,
                'bg-red-50 border border-red-200': error
            }">
                <div class="flex items-start">
                    <div class="flex-shrink-0 pt-0.5">
                        <CheckCircle2 v-if="success" class="h-5 w-5 text-green-500" />
                        <XCircle v-else class="h-5 w-5 text-red-500" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium" :class="{
                            'text-green-800': success,
                            'text-red-800': error
                        }">
                            {{ success ? successMessage : error }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
