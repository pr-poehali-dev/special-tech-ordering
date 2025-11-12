import { useEffect, useRef, useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

interface YandexMapProps {
  equipment: Equipment[];
  onEquipmentSelect: (equipment: Equipment) => void;
}

const EQUIPMENT_TYPES = [
  { value: 'all', label: 'Вся техника', icon: '🏗️', color: 'bg-primary' },
  { value: 'excavator', label: 'Экскаваторы', icon: '🏗️', color: 'bg-blue-500' },
  { value: 'bulldozer', label: 'Бульдозеры', icon: '🚜', color: 'bg-green-500' },
  { value: 'loader', label: 'Погрузчики', icon: '🏭', color: 'bg-orange-500' },
];

export default function YandexMap({ equipment, onEquipmentSelect }: YandexMapProps) {
  const [mapState] = useState({
    center: [55.751244, 37.618423],
    zoom: 11,
  });

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [liveEquipment, setLiveEquipment] = useState<Equipment[]>(equipment);

  useEffect(() => {
    setLiveEquipment(equipment);
  }, [equipment]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEquipment(prev => 
        prev.map(item => ({
          ...item,
          lat: item.lat + (Math.random() - 0.5) * 0.001,
          lng: item.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredEquipment = activeFilter === 'all' 
    ? liveEquipment 
    : liveEquipment.filter(item => item.type === activeFilter);

  const getPlacemarkIcon = (type: string, available: boolean) => {
    const color = available ? '#8B5CF6' : '#ea384c';
    
    return {
      layout: 'default#image',
      imageHref: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M20 0C12.3 0 6 6.3 6 14c0 10.5 14 36 14 36s14-25.5 14-36c0-7.7-6.3-14-14-14z" fill="${color}"/>
            <circle cx="20" cy="14" r="8" fill="white"/>
            <text x="20" y="18" font-size="16" text-anchor="middle" fill="${color}">
              ${type === 'excavator' ? '🏗️' : type === 'bulldozer' ? '🚜' : '🏭'}
            </text>
          </g>
        </svg>
      `)}`,
      imageSize: [40, 50],
      imageOffset: [-20, -50],
    };
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <YMaps query={{ apikey: '8d234b87-1234-5678-abcd-ef1234567890', lang: 'ru_RU' }}>
        <Map
          defaultState={mapState}
          width="100%"
          height="100%"
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        >
          <ZoomControl options={{ float: 'right' }} />
          <GeolocationControl options={{ float: 'left' }} />
          
          {filteredEquipment.map((item) => (
            <Placemark
              key={item.id}
              geometry={[item.lat, item.lng]}
              options={{
                ...getPlacemarkIcon(item.type, item.available),
                hideIconOnBalloonOpen: false,
              }}
              properties={{
                balloonContentHeader: `<strong>${item.name}</strong>`,
                balloonContentBody: `
                  <div style="padding: 8px;">
                    <p style="margin: 4px 0;">${item.description}</p>
                    <p style="margin: 4px 0;"><strong>Адрес:</strong> ${item.location}</p>
                    <p style="margin: 4px 0;"><strong>Цена:</strong> ${item.price.toLocaleString()} ₽/смену</p>
                    <p style="margin: 4px 0;">
                      <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; background: ${item.available ? '#22c55e' : '#ea384c'}; color: white; font-size: 12px;">
                        ${item.available ? 'Доступно' : 'Занято'}
                      </span>
                    </p>
                  </div>
                `,
                hintContent: item.name,
              }}
              onClick={() => {
                setSelectedMarker(item.id);
                onEquipmentSelect(item);
              }}
            />
          ))}
        </Map>
      </YMaps>

      <div className="absolute top-4 left-4 right-4 z-10 space-y-3">
        <Card className="p-4 bg-background/95 backdrop-blur border-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg mb-1">
                Отслеживание ГЛОНАСС
              </h3>
              <p className="text-sm text-muted-foreground">
                Автообновление каждые 30 секунд
              </p>
            </div>
            <Badge className="bg-green-500 text-white">
              <Icon name="Radar" className="mr-1 h-3 w-3" />
              Online
            </Badge>
          </div>
        </Card>

        <Card className="p-3 bg-background/95 backdrop-blur border-2">
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT_TYPES.map((type) => (
              <Button
                key={type.value}
                size="sm"
                variant={activeFilter === type.value ? "default" : "outline"}
                className={`h-8 text-xs ${activeFilter === type.value ? type.color + ' text-white hover:opacity-90' : ''}`}
                onClick={() => setActiveFilter(type.value)}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {type.value === 'all' 
                    ? liveEquipment.filter(eq => eq.available).length 
                    : liveEquipment.filter(eq => eq.type === type.value && eq.available).length
                  }
                </Badge>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 z-10 max-h-48 overflow-y-auto">
        {filteredEquipment.filter(eq => eq.available).map((item) => (
          <Card 
            key={item.id}
            className={`flex items-center gap-3 p-3 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-background/95 backdrop-blur border-2 ${
              selectedMarker === item.id ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
            onClick={() => {
              setSelectedMarker(item.id);
              onEquipmentSelect(item);
            }}
          >
            <div className="text-3xl">{item.image}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{item.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="MapPin" className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{item.location.split(',')[0]}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary whitespace-nowrap">
                {item.price.toLocaleString()} ₽
              </div>
              <Button 
                size="sm" 
                className="mt-1 h-6 text-xs bg-gradient-to-r from-primary to-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEquipmentSelect(item);
                }}
              >
                Заказать
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}