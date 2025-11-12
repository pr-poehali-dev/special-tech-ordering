import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Equipment {
  id: number;
  name: string;
  type: string;
  price: number;
  location: string;
  lat: number;
  lng: number;
  available: boolean;
  image: string;
  description: string;
}

const equipmentData: Equipment[] = [
  {
    id: 1,
    name: 'Экскаватор Caterpillar 320D',
    type: 'excavator',
    price: 12000,
    location: 'Москва, ул. Строителей 15',
    lat: 55.751244,
    lng: 37.618423,
    available: true,
    image: '🏗️',
    description: 'Гусеничный экскаватор, объем ковша 1.2 м³'
  },
  {
    id: 2,
    name: 'Бульдозер Komatsu D65',
    type: 'bulldozer',
    price: 15000,
    location: 'Москва, пр-т Мира 88',
    lat: 55.781234,
    lng: 37.638423,
    available: true,
    image: '🚜',
    description: 'Мощный бульдозер для тяжелых работ'
  },
  {
    id: 3,
    name: 'Погрузчик JCB 3CX',
    type: 'loader',
    price: 8000,
    location: 'Москва, ул. Рабочая 42',
    lat: 55.731244,
    lng: 37.598423,
    available: true,
    image: '🏭',
    description: 'Универсальный погрузчик с ковшом'
  },
  {
    id: 4,
    name: 'Экскаватор Hitachi ZX200',
    type: 'excavator',
    price: 11000,
    location: 'Москва, ул. Промышленная 7',
    lat: 55.771244,
    lng: 37.578423,
    available: false,
    image: '🏗️',
    description: 'Средний экскаватор для земляных работ'
  },
  {
    id: 5,
    name: 'Бульдозер Shantui SD16',
    type: 'bulldozer',
    price: 13500,
    location: 'Москва, ул. Заводская 12',
    lat: 55.741244,
    lng: 37.618423,
    available: true,
    image: '🚜',
    description: 'Надежный бульдозер китайского производства'
  },
  {
    id: 6,
    name: 'Погрузчик Volvo L90',
    type: 'loader',
    price: 9500,
    location: 'Москва, ул. Индустриальная 31',
    lat: 55.761244,
    lng: 37.608423,
    available: true,
    image: '🏭',
    description: 'Фронтальный погрузчик повышенной мощности'
  }
];

export default function Index() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'catalog' | 'map'>('catalog');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    date: '',
    duration: '1'
  });

  const filteredEquipment = selectedType === 'all' 
    ? equipmentData 
    : equipmentData.filter(eq => eq.type === selectedType);

  const handleOrder = () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.date) {
      toast.error('Заполните все поля формы');
      return;
    }
    
    toast.success(`Заказ на ${selectedEquipment?.name} оформлен!`);
    setIsOrderDialogOpen(false);
    setOrderForm({ name: '', phone: '', date: '', duration: '1' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏗️</div>
            <h1 className="font-heading text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              СпецТехника
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm">
              <Icon name="Map" className="mr-2 h-4 w-4" />
              Карта
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
              Заказы
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="Heart" className="mr-2 h-4 w-4" />
              Избранное
            </Button>
            <Button variant="ghost" className="text-sm">
              <Icon name="User" className="mr-2 h-4 w-4" />
              Профиль
            </Button>
          </nav>

          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            Поддержка
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient bg-[length:200%_200%]" />
        
        <div className="container relative px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Аренда спецтехники в один клик
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Найдите нужную технику на карте, оформите заказ онлайн и оплатите удобным способом
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 text-base md:text-lg h-12 md:h-14 px-6 md:px-8"
                onClick={() => setActiveTab('catalog')}
              >
                <Icon name="Layers" className="mr-2 h-5 w-5" />
                Смотреть каталог
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-primary/10 transition-all hover:scale-105 text-base md:text-lg h-12 md:h-14 px-6 md:px-8"
                onClick={() => setActiveTab('map')}
              >
                <Icon name="MapPin" className="mr-2 h-5 w-5" />
                Открыть карту
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              {activeTab === 'catalog' ? 'Каталог техники' : 'Карта спецтехники'}
            </h3>
            
            <div className="flex gap-2">
              <Button 
                variant={activeTab === 'catalog' ? 'default' : 'outline'}
                onClick={() => setActiveTab('catalog')}
                className="transition-all"
              >
                <Icon name="Grid3x3" className="h-4 w-4" />
              </Button>
              <Button 
                variant={activeTab === 'map' ? 'default' : 'outline'}
                onClick={() => setActiveTab('map')}
                className="transition-all"
              >
                <Icon name="Map" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {activeTab === 'catalog' && (
            <>
              <div className="flex flex-wrap gap-3 mb-8">
                <Button 
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  className="transition-all hover:scale-105"
                >
                  Все
                </Button>
                <Button 
                  variant={selectedType === 'excavator' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('excavator')}
                  className="transition-all hover:scale-105"
                >
                  🏗️ Экскаваторы
                </Button>
                <Button 
                  variant={selectedType === 'bulldozer' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('bulldozer')}
                  className="transition-all hover:scale-105"
                >
                  🚜 Бульдозеры
                </Button>
                <Button 
                  variant={selectedType === 'loader' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('loader')}
                  className="transition-all hover:scale-105"
                >
                  🏭 Погрузчики
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((equipment, index) => (
                  <Card 
                    key={equipment.id}
                    className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden animate-scale-in border-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setSelectedEquipment(equipment);
                      setIsOrderDialogOpen(true);
                    }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {equipment.image}
                      </div>
                      {!equipment.available && (
                        <Badge className="absolute top-4 right-4 bg-destructive">
                          Занято
                        </Badge>
                      )}
                      {equipment.available && (
                        <Badge className="absolute top-4 right-4 bg-green-500">
                          Доступно
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                        {equipment.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Icon name="MapPin" className="h-4 w-4" />
                        {equipment.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {equipment.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {equipment.price.toLocaleString()} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">за смену</div>
                        </div>
                        
                        <Button 
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          disabled={!equipment.available}
                        >
                          <Icon name="Calendar" className="mr-2 h-4 w-4" />
                          Заказать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === 'map' && (
            <div className="relative h-[600px] bg-muted rounded-2xl overflow-hidden border-2 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="font-heading text-2xl font-bold mb-2">Интерактивная карта</h3>
                <p className="text-muted-foreground">
                  Здесь будет отображаться карта с доступной техникой
                </p>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 z-20">
                {equipmentData.filter(eq => eq.available).map((equipment) => (
                  <Card 
                    key={equipment.id}
                    className="flex items-center gap-3 p-3 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-background/95 backdrop-blur"
                    onClick={() => {
                      setSelectedEquipment(equipment);
                      setIsOrderDialogOpen(true);
                    }}
                  >
                    <div className="text-3xl">{equipment.image}</div>
                    <div>
                      <div className="font-semibold text-sm">{equipment.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" className="h-3 w-3" />
                        {equipment.location.split(',')[0]}
                      </div>
                    </div>
                    <div className="ml-auto font-bold text-primary">
                      {equipment.price.toLocaleString()} ₽
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              Оформление заказа
            </DialogTitle>
            <DialogDescription>
              {selectedEquipment?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input 
                id="name" 
                placeholder="Иван Иванов"
                value={orderForm.name}
                onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Дата начала аренды</Label>
              <Input 
                id="date" 
                type="date"
                value={orderForm.date}
                onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration">Количество смен</Label>
              <Input 
                id="duration" 
                type="number" 
                min="1"
                value={orderForm.duration}
                onChange={(e) => setOrderForm({...orderForm, duration: e.target.value})}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Цена за смену:</span>
                <span className="font-semibold">{selectedEquipment?.price.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Количество смен:</span>
                <span className="font-semibold">{orderForm.duration}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold">Итого:</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {((selectedEquipment?.price || 0) * parseInt(orderForm.duration || '1')).toLocaleString()} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOrderDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={handleOrder}
            >
              <Icon name="CreditCard" className="mr-2 h-4 w-4" />
              Оплатить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-20 py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🏗️</div>
                <h3 className="font-heading text-xl font-bold">СпецТехника</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Аренда строительной техники по всей Москве
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Контакты</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Вакансии</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Каталог техники</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Доставка</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Оплата</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Помощь</li>
                <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">+7 (999) 123-45-67</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 СпецТехника. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
