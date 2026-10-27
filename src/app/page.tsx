import AvatarSection from '@/components/AvatarSection'
import LinkCard from '@/components/LinkCard'

export default function Home() {
  return (
    <>
      <div className="w-full max-w-md flex flex-col items-center">
        <AvatarSection />

        <div className="w-full flex flex-col gap-4">
          {/* P4L Genesis Studio */}
          <LinkCard
            href="https://studio.poets4life.com"
            label="P4L Genesis Studio"
            caption="Content Management System"
            variant="genesis"
            icon={<i className="fa-solid fa-video text-2xl text-white"></i>}
          />

          {/* Buy Me a Coffee */}
          <LinkCard
            href="https://buymeacoffee.com/poets4life"
            label="Buy Me a Coffee"
            caption="เลี้ยงนมอุ่นๆ น้องคูเปอร์หน่อยค้าบ ❤️"
            variant="bmc"
            icon={<i className="fa-solid fa-mug-hot text-2xl text-gray-900"></i>}
          />

          {/* Ko-fi */}
          <LinkCard
            href="https://ko-fi.com/poets4life"
            label="Ko-fi"
            caption="สนับสนุนค่าน้ำมันน้องคูเปอร์ ⛽❤️"
            variant="kofi"
            icon={<i className="fa-solid fa-heart text-2xl text-white"></i>}
          />

          {/* Shopee */}
          <LinkCard
            href="https://collshp.com/funkypoets4life"
            label="Cooper's Biker Collection"
            caption="Shop Biker Gear | ส่องไอเทมไบค์เกอร์สุดเก๋า จิ้มเลย!"
            variant="social"
            iconWrapperClassName="bg-[#ee4d2d]"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: 'white' }}
              >
                <path d="M22,17V12.92C22,11.8 21.16,10.87 20.06,10.74L14.77,10.15V9.41C14.77,7.42 13.15,5.8 11.16,5.8V5.8C9.17,5.8 7.55,7.42 7.55,9.41V10.15L2.26,10.74C1.16,10.87 0.32,11.8 0.32,12.92V17C0.32,18.1 1.22,19 2.32,19H20C21.1,19 22,18.1 22,17M9.05,9.41C9.05,8.25 10,7.3 11.16,7.3V7.3C12.32,7.3 13.27,8.25 13.27,9.41V10.15H9.05V9.41M11.16,16.5C10.06,16.5 9.17,15.61 9.17,14.51V13.71C9.17,13.26 9.53,12.9 9.98,12.9V12.9C10.43,12.9 10.79,13.26 10.79,13.71V14.51C10.79,14.71 10.96,14.88 11.16,14.88C11.36,14.88 11.53,14.71 11.53,14.51V13.71C11.53,13.26 11.89,12.9 12.34,12.9V12.9C12.79,12.9 13.15,13.26 13.15,13.71V14.51C13.15,15.61 12.26,16.5 11.16,16.5Z"></path>
              </svg>
            }
          />

          {/* YouTube */}
          <LinkCard
            href="https://youtube.com/@poets4life"
            label="YouTube"
            caption="Watch the latest Shorts!"
            variant="social"
            iconWrapperClassName="bg-red-600"
            icon={<i className="fa-brands fa-youtube text-2xl"></i>}
          />

          {/* Facebook */}
          <LinkCard
            href="https://facebook.com/poets4life"
            label="Facebook"
            caption="Our Biker Community"
            variant="social"
            iconWrapperClassName="bg-blue-600"
            icon={<i className="fa-brands fa-facebook-f text-2xl"></i>}
          />

          {/* Instagram */}
          <LinkCard
            href="https://www.instagram.com/poetsfourlife/"
            label="Instagram"
            caption="Life Behind the Scenes"
            variant="social"
            iconWrapperClassName="border border-gray-600"
            iconWrapperStyle={{
              background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            }}
            icon={<i className="fa-brands fa-instagram text-2xl text-white"></i>}
          />

          {/* TikTok */}
          <LinkCard
            href="https://tiktok.com/@poetsforlife"
            label="TikTok"
            caption="Join the viral rides"
            variant="social"
            iconWrapperClassName="bg-black"
            icon={<i className="fa-brands fa-tiktok text-2xl"></i>}
          />
        </div>

        <div className="mt-16 text-center text-gray-600 text-xs">
          <p>© 2026 Poets4Life. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}