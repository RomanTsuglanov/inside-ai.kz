"use client"

import { useState, useEffect } from "react"
import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link"
import { ArrowRight, Check, Moon, Sun, X } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import icon1 from "@/public/assets/sofa-analytics-icon---simple-style--minimalism-.png"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import CSVAnalytics from "@/components/csv_analytics"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const navItems = [
  { id: "features", name: "Что мы предлагаем" },
  { id: "analytics", name: "Аналитика" },
  { id: "reviews", name: "Отзывы" },
  { id: "pricing", name: "Цены" },
  { id: "faq", name: "FAQ" },
];

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export default function LandingPage() {

  const [scrolled, setScrolled] = useState(false)
  const [yearlyBilling, setYearlyBilling] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [analyticsRef, analyticsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [faqRef, faqInView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openTallyForm = () => {
    setIsModalOpen(true)
  }

  const pricingPlans = [
    {
      name: "Стандартный",
      description: "Для малых предприятий",
      price: yearlyBilling ? 79000 : 99000,
      features: [
        { name: "Анализ оборачиваемости", included: true },
        { name: "Валовая прибыль и маржинальность", included: true },
        { name: "Анализ ценовой динамики", included: true },
        { name: "Оптимизация ценовой стратегии", included: true },
        { name: "Сегментация товаров и клиентов", included: false },
        { name: "Дашборды и отчеты", included: false },
      ],
    },
    {
      name: "Продвинутый",
      description: "Для растущих компаний",
      price: yearlyBilling ? 159000 : 199000,
      features: [
        { name: "Анализ оборачиваемости", included: true },
        { name: "Сегментация товаров и клиентов", included: true },
        { name: "Дашборды и отчеты", included: true },
        { name: "Оптимизация ценовой стратегии", included: true },
        { name: "Приоритетная поддержка", included: true },
        { name: "Кастомные интеграции", included: false },
      ],
    },
    {
      name: "Энтерпрайз",
      description: "Для крупных организаций",
      price: "Договорная",
      features: [
        { name: "Полный набор", included: true },
        { name: "Дашборды и отчеты", included: true },
        { name: "Неограниченное количество данных", included: true },
        { name: "Чат и поддержка 24/7", included: true },
        { name: "Расширенная оптимизация цен", included: true },
        { name: "Пользовательские интеграции", included: true },
      ],
    },
  ]

  return (
    <div className={`flex flex-col min-h-screen`}>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <motion.div
            className="flex items-center "
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src={icon1} alt="Inside.ai logo" className="h-6 w-6" />
              
              <span className="ml-2 font-bold text-xl">INSIDE.AI</span>
            </motion.div>
          </Link>
          <nav className="hidden md:flex gap-6">
  {navItems.map(({ id, name }) => (
    <motion.div
      key={id}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        className="text-sm font-medium hover:text-primary transition-colors"
        href={`#${id}`}
      >
        {name}
      </Link>
    </motion.div>
  ))}
</nav>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="ghost"
                size="icon"
                
                className="text-gray-700 dark:text-gray-300"
              >
                {<Sun className="h-5 w-5" />}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onClick={openTallyForm}>Начать</Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        <section className="relative w-full py-16 md:py-24 lg:py-32" id="hero">
          <RetroGrid className="z-0" angle={65} />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-4 md:px-6 relative z-10"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-2"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Раскройте полный потенциал Вашего мебельного бизнеса
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Принимайте обоснованные решения на основе реальных данных. Улучшите свои продажи с нашим аналитическим решением!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={openTallyForm}>
                  Улучшить <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.location.href = '#analytics'}>
                  Попробовать анализ данных
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.section
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="w-full py-16 md:py-24 relative"
          id="features"
        >
          <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">
              Что мы предлагаем
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Мощные инструменты для анализа оборачиваемости, ценовой политики и прибыли.
              Ваша виртуальная аналитическая служба.
            </motion.p>
            <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  //icon: <BarChart2  className="h-8 w-8 text-white hover:text-gray-200" />,
                  title: "Анализ оборачиваемости",
                  description: "Получите глубокие данные о вашей продаже",
                  content: "Наш мощный аналитический движок обрабатывает ваши данные о продажах для выявления трендов, сезонных паттернов и возможностей роста."
                },
                {
                  //icon: <DollarSign className="h-8 w-8 text-white" />,
                  title: "Динамическая ценовая политика",
                  description: "Оптимизируйте свою ценовую стратегию в режиме реального времени",
                  content: "Наш AI-движок ценовой политики анализирует рыночные тренды и Ваши исторические данные для предложения оптимальных стратегий ценообразования."
                },
                {
                  //icon: <TrendingUp className="h-8 w-8 text-white" />,
                  title: "Прогнозы рентабельности",
                  description: "Максимизируйте свою прибыль с помощью данных",
                  content: "Получите детальные данные о своей прибыли и выявите ключевые области для оптимизации затрат и роста доходов."
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="bg-card hover:bg-card/80 transition-all duration-300 transform hover:scale-105">
                    <CardHeader>
                      
                      <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        {feature.content}
                      </p>
                      <Button variant="link" className="p-0" onClick={openTallyForm}>
                        Начать <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>


  
          <motion.section
            ref={analyticsRef}
            initial="hidden"
            animate={analyticsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="w-full py-16 md:py-24"
            id="analytics"
          >
            <div className="container mx-auto px-4 md:px-6">
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              >
                Попробуйте наш аналитический инструмент
              </motion.h2>
              <motion.div
                variants={scaleIn}
                className="w-full"
              >
                <CSVAnalytics />
              </motion.div>
            </div>
          </motion.section>

          <motion.section
          ref={testimonialsRef}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="w-full py-16 md:py-24 bg-secondary/5"
          id="testimonials"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 variants={fadeIn} id="reviews" className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Что говорят наши клиенты
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Айдар Нурланов",
                  position: "Директор, МебельКо",
                  quote: "Өте жақсы қызмет! Сатылымдарымды тез түсінуге көмектесті"
                },
                {
                  name: "Нурлан Абдикадыров",
                  position: "Финансовый директор, КазComfort",
                  quote: "Точный и понятный анализ. Облегчил мою работу. Рахмет!"
                },
                  {
                    name: "Марат Исаев",
                    position: "Владелец, Мебельное производство",
                    quote: "Этот сервис поднял мой бизнес на новый уровень. Отлично!"
                  }
                ].map((testimonial, index) => (
                  <motion.div key={index} variants={scaleIn}>
                    <Card className="bg-primary-foreground hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.position}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="italic">{testimonial.quote}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
  
          <motion.section
            ref={pricingRef}
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="w-full py-16 md:py-24 bg-secondary/5"
            id="pricing"
          >
            <div className="container mx-auto px-4 md:px-6">
              <motion.div variants={fadeIn} className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Планы подписки</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Выберите план подходящий для Вашего бизнеса
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="flex justify-center items-center space-x-4 mb-8"
              >
                <span className="text-sm font-medium">Ежемесячно</span>
                <Switch
                  checked={yearlyBilling}
                  onCheckedChange={setYearlyBilling}
                  className="data-[state=checked]:bg-primary"
                />
                <span className="text-sm font-medium">Ежегодно (Экономия 20%)</span>
              </motion.div>
  
              <motion.div 
                variants={staggerContainer}
                className="grid gap-6 lg:grid-cols-3"
              >
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    variants={scaleIn}
                    className="flex"
                  >
                    <Card 
                      className={`flex flex-col justify-between w-full transition-transform duration-300 hover:scale-105
                        ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}
                    >
                      <div>
                        <CardHeader>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-4xl font-bold mb-4">
                            {typeof plan.price === 'number' ? `${plan.price.toFixed(0)} тг.` : plan.price}
                            {typeof plan.price === 'number' && <span className="text-lg font-normal">/месяц</span>}
                          </div>
                          <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center">
                                {feature.included ? (
                                  <Check className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                  <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={feature.included ? '' : 'text-muted-foreground'}>
                                  {feature.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </div>
                      <CardContent>
                        <Button 
                          className="w-full" 
                          onClick={openTallyForm}
                        >
                          {index === 2 ? 'Связаться с отделом продаж' : 'Начать'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
  
          <motion.section
            ref={faqRef}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="w-full py-16 md:py-24"
            id="faq"
          >
            <div className="container mx-auto px-4 md:px-6">
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              >
                Часто задаваемые вопросы
              </motion.h2>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {[
                  {
                    question: "Как работает аналитическая платформа?",
                    answer: "Наша платформа собирает и анализирует данные из вашего мебельного бизнеса, предоставляя данные о оборачиваемости, ценовой политике и прибыли. Она использует сложные алгоритмы для выявления трендов и возможностей для улучшения."
                  },
                  {
                    question: "Защищены ли мои данные?",
                    answer: "Да, мы серьезно относимся к защите данных. Все данные защищены в процессе передачи и хранения, и мы соблюдаем стандартные меры безопасности для защиты вашей информации."
                  },
                  {
                    question: "Есть ли интеграция?",
                    answer: "Наша платформа разработана для беспрепятственной интеграции с широким кругом существующих бизнес-систем и программного обеспечения. Мы предоставляем API и поддержку для пользовательских интеграций по мере необходимости."
                  },
                  {
                    question: "Какую поддержку вы предлагаете?",
                    answer: "Мы предлагаем всестороннюю поддержку, включая электронную почту, чат и телефон. Наша команда экспертов готова помочь вам получить максимальную выгоду от нашей платформы и ответить на любые вопросы или проблемы, которые вы можете иметь."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                    }}
                  >
                    <AccordionItem value={`item-${index + 1}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </motion.section>
  
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="w-full py-16 md:py-24 bg-primary text-primary-foreground"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.div
                  variants={fadeIn}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Готовы трансформировать свой бизнес?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                    Начните сегодня и откройте для себя возможности принятия решени�� на основе данных.
                  </p>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    size="lg" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    onClick={openTallyForm}
                  >
                    Начать прямо сейчас
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={openTallyForm}
                  >
                    Записаться на демонстрацию
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </main>
  
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full py-6 bg-card"
        >
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <Link href="/" className="flex items-center justify-center">
                <Image src={icon1} alt="Inside.ai logo" className="h-6 w-6" />
                <span className="ml-2 font-bold">Inside.ai</span>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                © 2024 Professional Furniture Analytics. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              {["Условия использования", "Политика конфиденциальности", "Связаться с нами"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link className="text-sm hover:underline underline-offset-4" href="#">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.footer>
  
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle>Начните свой путь с INSIDE.AI</DialogTitle>
                <DialogDescription>
                  Заполните эту форму, чтобы начать свой путь с INSIDE.AI.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <iframe
                  src="https://tally.so/embed/wo7xyV?alignLeft=1&hideTitle=1&transparentBackground=1"
                  width="100%"
                  height={500}
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  title="INSIDE.AI Contact Form"
                />
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }