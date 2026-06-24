import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, products } from '../data/products'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  
  const [selectedColor, setSelectedColor] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
          <Link to="/" className="text-blue-600 hover:underline">العودة للرئيسية</Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب'
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'رقم الهاتف غير صحيح'
    if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة'
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const orderData = {
      productName: product.name,
      productPrice: product.price,
      selectedColor: product.colors[selectedColor],
      customerName: formData.name,
      customerPhone: formData.phone,
      customerCity: formData.city,
      customerAddress: formData.address,
      orderDate: new Date().toLocaleString('ar-MA')
    }

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxOxdOd2B50cVIbScFtYe2vdgJixOn08jlWtZStpsQSfJeALQ0ixbu-YDSHA06ul7cb/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
      
      navigate('/thank-you')
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop'
                  }}
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                    خصم {discount}%
                  </div>
                )}
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                  <svg className="w-8 h-8 mx-auto text-green-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-gray-600">منتج أصلي</p>
                </div>
                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                  <svg className="w-8 h-8 mx-auto text-blue-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-xs text-gray-600">توصيل سريع</p>
                </div>
                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                  <svg className="w-8 h-8 mx-auto text-yellow-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-gray-600">ضمان {product.specifications['الضمان']}</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="bg-gradient-to-l from-blue-50 to-blue-100 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">
                    {product.price} درهم
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.oldPrice} درهم
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      وفر {product.oldPrice - product.price} درهم
                    </span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">اختر اللون:</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                        selectedColor === index 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: product.colorCodes[index] }}
                      />
                      <span className="text-sm">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">المميزات:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">المواصفات:</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div 
                      key={index}
                      className={`flex justify-between p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persuasion Section */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              لماذا تختار هذه الدراجة؟
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">جودة لا مثيل لها</h3>
                <p className="text-gray-300">
                  مصنوعة من أجود المواد لضمان المتانة والأداء العالي. تم اختبارها في أصعب الظروف.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">سعر منافس</h3>
                <p className="text-gray-300">
                  نقدم لك أفضل سعر في السوق مع ضمان الجودة. وفر أموالك دون التنازل عن الجودة.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">توصيل سريع</h3>
                <p className="text-gray-300">
                  نوصل لجميع مدن المغرب في أسرع وقت ممكن. الدفع عند الاستلام متاح.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">ضمان شامل</h3>
                <p className="text-gray-300">
                  ضمان {product.specifications['الضمان']} على جميع الأجزاء. خدمة ما بعد البيع متوفرة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              أسئلة شائعة
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">هل التوصيل مجاني؟</h3>
                <p className="text-gray-600">نعم، التوصيل مجاني لجميع مدن المغرب للطلبات فوق 1000 درهم.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">كم يستغرق التوصيل؟</h3>
                <p className="text-gray-600">عادة ما يستغرق التوصيل من 2 إلى 5 أيام عمل حسب المدينة.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">هل يمكنني الدفع عند الاستلام؟</h3>
                <p className="text-gray-600">نعم، نوفر خدمة الدفع عند الاستلام لجميع مدن المغرب.</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">ماذا لو لم يعجبني المنتج؟</h3>
                <p className="text-gray-600">يمكنك إرجاع المنتج خلال 7 أيام من الاستلام إذا كان في حالته الأصلية.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-12 md:py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-l from-blue-600 to-blue-800 p-6 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  🎉 اطلب الآن
                </h2>
                <p className="text-blue-100">
                  املأ النموذج وسنتصل بك لتأكيد الطلب
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                {/* Product Summary */}
                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop'
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">اللون: {product.colors[selectedColor]}</p>
                    <p className="text-lg font-bold text-blue-600">{product.price} درهم</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06XXXXXXXX"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.city ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">اختر المدينة</option>
                    <option value="الدار البيضاء">الدار البيضاء</option>
                    <option value="الرباط">الرباط</option>
                    <option value="مراكش">مراكش</option>
                    <option value="فاس">فاس</option>
                    <option value="طنجة">طنجة</option>
                    <option value="أكادير">أكادير</option>
                    <option value="مكناس">مكناس</option>
                    <option value="وجدة">وجدة</option>
                    <option value="القنيطرة">القنيطرة</option>
                    <option value="تطوان">تطوان</option>
                    <option value="سلا">سلا</option>
                    <option value="الجديدة">الجديدة</option>
                    <option value="بني ملال">بني ملال</option>
                    <option value="خريبكة">خريبكة</option>
                    <option value="آسفي">آسفي</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    العنوان الكامل <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="أدخل عنوانك بالتفصيل"
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-l from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      جاري الإرسال...
                    </span>
                  ) : (
                    '✅ تأكيد الطلب - الدفع عند الاستلام'
                  )}
                </button>

                {/* Trust Note */}
                <p className="text-center text-gray-500 text-sm">
                  🔒 معلوماتك آمنة ولن يتم مشاركتها مع أي طرف ثالث
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            منتجات قد تعجبك
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <Link 
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=200&fit=crop'
                  }}
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-1">{p.name}</h3>
                  <p className="text-blue-600 font-bold">{p.price} درهم</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Order Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">السعر</p>
            <p className="text-xl font-bold text-blue-600">{product.price} درهم</p>
          </div>
          <a 
            href="#order-form"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-center transition-colors"
          >
            اطلب الآن
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
