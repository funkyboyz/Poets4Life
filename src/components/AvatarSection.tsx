export default function AvatarSection() {
  return (
    <>
      <div className="relative w-32 h-32 mb-5">
        {/* Cooper's glowing avatar — matches original static design */}
        <div className="absolute inset-0 bg-hdOrange rounded-full animate-pulse opacity-50 blur-md"></div>
        <img
          src="/Cooper_Baby-Biker-Prototype007-s.png"
          alt=""
          className="relative w-full h-full object-cover object-top rounded-full border-4 border-hdOrange shadow-2xl"
        />
      </div>

      <h1 className="text-4xl font-heading tracking-wider mb-2 text-white uppercase">
        Poets<span className="text-hdOrange">4</span>Life
      </h1>
      <p className="text-gray-300 text-lg mb-6">@poets4life</p>

      <div className="text-center text-gray-200 font-light mb-8 px-4 text-[16px] leading-[1.8]">
        <p className="mb-4">
          พื้นที่แห่งถ้อยคำที่เติมเต็มพลังใจ พบกับบทกวี คำคม และสุภาษิต ที่จะช่วยนำทางและสร้างแรงบันดาลใจในทุกย่างก้าวของชีวิต
        </p>
        <p className="mb-4">
          🏍️ ถ่ายทอดผ่านมุมมองของ 'น้องคูเปอร์' ไบค์เกอร์ตัวน้อยที่มีหัวใจสุดเก๋า
        </p>
        <p>👇 กดติดตามเพื่อรับพลังบวกและข้อคิดเตือนสติได้ทุกวันครับ!</p>
      </div>
    </>
  )
}