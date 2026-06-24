import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

function Home() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-right">
              <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                🚴 عروض حصرية
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                اكتشف عالم
                <span className="text-yellow-400 block">الدراجات الهوائية</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                أفضل الدراجات الهوائية بجودة عالية وأسعار منافسة. 
                توصيل سريع لجميع أنحاء المغرب مع ضمان شامل.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href="#products" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  تصفح المنتجات
                </a>
                <a 
                  href="https://wa.me/212721203554" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-white/30"
                >
                  تواصل معنا
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop" 
                alt="دراجة هوائية"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">جودة عالية</h3>
              <p className="text-gray-500 text-xs md:text-sm">منتجات أصلية 100%</p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">توصيل سريع</h3>
              <p className="text-gray-500 text-xs md:text-sm">لجميع أنحاء المغرب</p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">ضمان شامل</h3>
              <p className="text-gray-500 text-xs md:text-sm">حتى سنتين</p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">دعم متواصل</h3>
              <p className="text-gray-500 text-xs md:text-sm">خدمة عملاء 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              منتجاتنا المميزة
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              اختر دراجتك المثالية
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              مجموعة متنوعة من الدراجات الهوائية لجميع الأعمار والاستخدامات. 
              جودة عالية وأسعار تنافسية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                لماذا نحن؟
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                نحن الخيار الأفضل لشراء دراجتك
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                منذ أكثر من 5 سنوات ونحن نقدم أفضل الدراجات الهوائية في المغرب. 
                نفخر بثقة آلاف العملاء الذين اختارونا لجودة منتجاتنا وخدماتنا المتميزة.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">منتجات أصلية ومضمونة</h4>
                    <p className="text-gray-400 text-sm">جميع منتجاتنا أصلية 100% مع شهادة ضمان</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">أسعار تنافسية</h4>
                    <p className="text-gray-400 text-sm">أفضل الأسعار في السوق مع عروض مستمرة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">خدمة ما بعد البيع</h4>
                    <p className="text-gray-400 text-sm">دعم فني وصيانة لجميع المنتجات</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">+5000</div>
                <p className="text-gray-300">عميل سعيد</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">+50</div>
                <p className="text-gray-300">موديل مختلف</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">5</div>
                <p className="text-gray-300">سنوات خبرة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <p className="text-gray-300">دعم متواصل</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            هل أنت جاهز لاقتناء دراجتك؟
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            تواصل معنا الآن واحصل على استشارة مجانية لاختيار الدراجة المناسبة لك
          </p>
          <a 
            href="https://wa.me/212721203554" 
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل عبر واتساب
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
