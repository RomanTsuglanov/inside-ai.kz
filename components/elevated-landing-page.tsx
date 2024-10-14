"use client"

import { useState, useEffect } from "react"
import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link"
import { ArrowRight, BarChart2, Check, DollarSign, Moon, PieChart, Sun, TrendingUp, X } from "lucide-react"

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



export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [yearlyBilling, setYearlyBilling] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)



  
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
        { name: "Неограниченное количество  данных", included: true },
        { name: "Чат и поддержка 24/7", included: true },
        { name: "Расширенная оптимизация цен", included: true },
        { name: "Пользовательские интеграции", included: true },
      ],
    },
  ]

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <PieChart className="h-8 w-8 text-primary" />
            <span className="ml-2 font-bold text-xl">PFA.ai</span>
          </Link >
          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
              Что мы предлагаем
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#dashboard">
              Дашборды и визуализации
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#testimonials">
              Отзывы
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
              Цены
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#faq">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={openTallyForm}>Начать</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-48" id="hero">
          <RetroGrid className="z-0" angle={65} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Раскройте полный потенциал Вашего мебельного бизнеса
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Принимайте обоснованные решения на основе реальных данных. Улучшите свои продажи с нашим аналитическим решением!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={openTallyForm}>
                  Улучшиить <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.location.href = '#faq'}>
                  Остались вопросы?
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 relative" id="features">
          <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Что мы предлагаем</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Мощные инструменты для анализа оборачиваемости, ценовой политики и прибыли. 
            Ваша виртуальная аналитическая служба.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card hover:bg-card/80 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center mb-4">
                    <BarChart2 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Анализ оборачиваемости</CardTitle>
                  <CardDescription className="text-lg">
                    Получите глубокие данные о вашей продаже
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Наш мощный аналитический движок обрабатывает ваши данные о продажах для выявления трендов, сезонных паттернов и возможностей роста.
                  </p>
                  <Button variant="link" className="p-0" onClick={openTallyForm}>
                    Начать <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card hover:bg-card/80 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary-foreground flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Динамическая ценовая политика</CardTitle>
                  <CardDescription className="text-lg">
                    Оптимизируйте свою ценовую стратегию в режиме реального времени
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Наш AI-движок ценовой политики анализирует рыночные тренды и Ваши исторические данные для предложения оптимальных стратегий ценообразования.
                  </p>
                  <Button variant="link" className="p-0" onClick={openTallyForm}>
                    Начать <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card hover:bg-card/80 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Прогнозы рентабельности</CardTitle>
                  <CardDescription className="text-lg">
                    Максимизируйте свою прибыль с помощью данных
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Получите детальные данные о своей прибыли и выявьте ключевые области для оптимизации затрат и роста доходов.
                  </p>
                  <Button variant="link" className="p-0" onClick={openTallyForm}>
                    Начать <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-secondary/10" id="dashboard">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Визуализация Ваших данных</h2>
            <div className="flex justify-center">
              <Card className="w-full max-w-5xl overflow-hidden">
                <CardContent className="p-1">
                  <div className="rounded-lg overflow-hidden shadow-2xl">
                    <img
                      src="/dashboard.png"
                      alt="Dashboard Preview"
                      className="w-full h-auto object-cover"
                      width={1280}
                      height={720}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32" id="testimonials">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Что говорят наши клиенты</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-primary-foreground">
                <CardHeader>
                  <CardTitle>Айдар Нурланов:</CardTitle>
                  <CardDescription>Директор, МебельКо</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    Өте жақсы қызмет! Сатылымдарымды тез түсінуге көмектесті
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground">
                <CardHeader>
                  <CardTitle>Нурлан Абдикадыров:</CardTitle>
                  <CardDescription>Финансовый директор, КазComfort</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    Точный и понятный анализ. Облегчил мою работу. Рахмет!
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground">
                <CardHeader>
                  <CardTitle>Марат Исаев</CardTitle>
                  <CardDescription>Владелец, Мебельное производство</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    Этот сервис поднял мой бизнес на новый уровень. Отлично!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-secondary/10" id="pricing">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Планы подписки</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Выберите план подходящий для Вашего бизнеса 
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <span className="text-sm font-medium">Ежемесячно</span>
              <Switch
                checked={yearlyBilling}
                onCheckedChange={setYearlyBilling}
              />
              <span className="text-sm font-medium">Ежегодно (Экономия 20%)</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <Card key={plan.name} className={`flex flex-col justify-between ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                  <div>
                    <CardHeader>
                      <CardTitle  className="text-2xl">{plan.name}</CardTitle>
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
                            <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  <CardContent>
                    <Button className="w-full" onClick={openTallyForm}>
                      {index === 2 ? 'Связаться с отделом продаж' : 'Начать'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32" id="faq">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как работает аналитическая платформа?</AccordionTrigger>
                <AccordionContent>
                  Наша платформа собирает и анализирует данные из вашего мебельного бизнеса, предоставляя данные о оборачиваемости, 
                  ценовой политике и прибыли. Она использует сложные алгоритмы для выявления трендов и возможностей для улучшения.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Защищены ли мои данные?</AccordionTrigger>
                <AccordionContent>
                  Да, мы серьезно относимся к защите данных. 
                  Все данные защищены в процессе передачи и хранения, и мы соблюдаем стандартные меры безопасности для защиты вашей информации.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Могу ли я интегрировать c существующими системами?</AccordionTrigger>
                <AccordionContent>
                Наша платформа разработана для беспрепятственной интеграции с широким кругом существующих бизнес-систем и программного обеспечения. 
                Мы предоставляем API и поддержку для пользовательских интеграций по мере необходимости.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Какую поддержку вы предлагаете?</AccordionTrigger>
                <AccordionContent>
                Мы предлагаем всестороннюю поддержку, включая электронную почту, чат и телефон. 
                Наша команда экспертов готова помочь вам получить максимальную выгоду от нашей платформы и ответить на любые вопросы или проблемы, которые вы можете иметь.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Готовы трансформировать свой бизнес?
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Начните сегодня и откройте для себя возможности принятия решений на основе данных.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={openTallyForm}>
                  Начать прямо сейчас
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={openTallyForm}>
                  Записаться на демонстрацию
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-card">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link href="/" className="flex items-center justify-center">
              <PieChart className="h-6 w-6 text-primary" />
              <span className="ml-2 font-bold">PFA.AI</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">© 2024 Professional Furniture Analytics. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Условия использования
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Политика конфиденциальности
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Связаться с нами
            </Link>
          </nav>
        </div>
      </footer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
            Заполните эту форму, чтобы начать свой путь с PFA.AI.
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
              title="FurniSight Contact Form"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}