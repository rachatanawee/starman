import Link from 'next/link'
import { Button } from '@spark/core'
import { } from '@spark/core' // button'
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react'
import '@/app/globals.css'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-xl border border-gray-200">
              <FileQuestion className="h-24 w-24 text-primary" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          ไม่พบหน้าที่คุณต้องการ
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          ขอโทษด้วย หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่จริง
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 min-w-[200px]">
            <Link href="/en/company">
              <Home className="h-5 w-5 mr-2" />
              กลับหน้าหลัก
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[200px]">
            <Link href="/en/login">
              <ArrowLeft className="h-5 w-5 mr-2" />
              กลับหน้า Login
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">ลิงก์ที่อาจเป็นประโยชน์</h3>
          </div>
          <div className="space-y-2 text-left">
            <Link 
              href="/en/company" 
              className="block text-primary hover:text-primary hover:underline text-sm"
            >
              → รายการบริษัททั้งหมด
            </Link>
            <Link 
              href="/en/guide" 
              className="block text-primary hover:text-primary hover:underline text-sm"
            >
              → คู่มือการใช้งาน
            </Link>
            <Link 
              href="/en/guide/demo" 
              className="block text-primary hover:text-primary hover:underline text-sm"
            >
              → Demo Walkthrough
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-8">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  )
}
