import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QeRD091JKh638GzhbbUlOOJWRYPzMG.png"
            alt="Loading..."
            width={120}
            height={120}
            priority
          />
        </div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
