'use client'
import '../hero.scss'
import React, { useEffect, useRef,useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup,TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import CardDemo from '@/components/HouseCard/HouseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

let DefaultIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});

// Create a red icon for the active marker
let RedIcon = L.icon({
    iconUrl: '/images/marker-icon-red.png',
    shadowUrl: '/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

const positions = [ 
  {id: 1, lat: 44.408022222452196, lng: -79.6579432075455, addr: "xx Corbett Dr"}, 
  {id: 2, lat: 43.927568830751916, lng: -78.84555030474665, addr: "xx Bennett Crescent"}, 
  {id: 3, lat: 43.901028488685085, lng: -78.88223774817386, addr: "xx Madison Ave"}, 
  {id: 4, lat: 43.920973854812026, lng: -78.96547362592808, addr: "xx Medland Ave"}, 
  {id: 5, lat: 43.9058202177951, lng:  -78.9759913032113, addr: "xx Ogston Cres"}, 
  {id: 6, lat: 43.88599810109301, lng:  -78.9670917301255, addr: "xx Kingfisher Way"}, 
  {id: 7, lat: 44.34229402387427, lng: -79.73031111178403, addr: "xx Logan Ct"}, 
  {id: 8, lat: 44.208736516164755, lng: -79.46624271039914, addr: "xx Bill Guy Dr"}, 
  {id: 9, lat: 44.206822367023186, lng:  -79.4626822443201, addr: "xx Faimira Ave"}, 
  {id: 10, lat: 44.098061151604725, lng: -79.44363262613304, addr: "xx Falconridge Ter"}, 
  {id: 11, lat: 44.03371721307411, lng: -79.44726295526284, addr: "xx Winn Pl"}, 
  {id: 12, lat: 43.94669455567249, lng: -79.43096225082786, addr: "xx Sandbanks Dr"}, 
  {id: 13, lat: 43.94379035390629, lng: -79.47896202833395, addr: "xx Heron Hollow Ave"}, 
  {id: 14, lat: 43.91561223372934, lng: -79.45355038141896, addr: "xx Greenbank Dr"}, 
  {id: 15, lat: 43.90486036138218, lng: -79.45556717879317, addr: "xx Aztec Ct"}, 
  {id: 16, lat: 43.89875708330963, lng: -79.41200435551033, addr: "xx Shirley Dr"}, 
  {id: 17, lat: 43.88306006670459, lng: -79.42370178028072, addr: "xx Rockport Crescent"}, 
  {id: 18, lat: 43.8714299797677, lng:  -79.4313656103027, addr: "xx Canterbury Ct"}, 
  {id: 19, lat: 43.864160022724846, lng: -79.43701264295048, addr: "xx Baif Blvd"}, 
  {id: 20, lat: 43.85630747319168, lng:  -79.4293488129285, addr: "xx Northern Heights Dr"}, 
  {id: 21, lat: 43.86212427585811, lng: -79.54390290378338, addr: "xx Treasure Rd"}, 
  {id: 22, lat: 43.91619336068546, lng: -79.36884489170234, addr: "xx Isabella Peach Dr"}, 
  {id: 23, lat: 43.906022819600096, lng: -79.26961846089142, addr: "xx Beer Ln"}, 
  {id: 24, lat: 43.888327314588786, lng: -79.31358183186525, addr: "xx Henry Bauer Ave"}, 
  {id: 25, lat: 43.891224092922705, lng: -79.25677239215076, addr: "xx Bishop Crescent"}, 
  {id: 26, lat: 43.883692176209, lng: -79.29348415272098, addr: "xx Delancey Crescent"}, 
  {id: 27, lat: 43.88040873497232, lng: -79.31170604847846, addr: "xx Redwood Ln"}, 
  {id: 28, lat: 43.871523221970335, lng: -79.33850295400416, addr: "xx Baycliffe Rd"}, 
  {id: 29, lat: 43.84677447264089, lng: -79.28261938291588, addr: "xx Kyla Crescent"}, 
  {id: 30, lat: 43.82555029320998, lng:  -79.2695834551715, addr: "xx Major Oak Terrace"}, 
  {id: 31, lat: 43.81533850536056, lng: -79.31167087903192, addr: "xx Lapworth Crescent"}, 
  {id: 32, lat: 43.80270572010555, lng: -79.23680740827135, addr: "xx Malvern St"}, 
  {id: 33, lat: 43.78442376964584, lng: -79.32545171693312, addr: "xx Pindar Crescent"}, 
  {id: 34, lat: 43.78065914441371, lng: -79.30347686730688, addr: "xx Arkona Dr"}, 
  {id: 35, lat: 43.81157582745435, lng:  -79.3973355470664, addr: "xx Fairfield Pl"}, 
  {id: 36, lat: 43.7946408431481, lng: -79.43160141428021, addr: "xx Pleasant Ave"}, 
  {id: 38, lat: 43.71433065401443, lng: -79.41256898214223, addr: "xx Ardmore Rd"}, 
  {id: 39, lat: 43.67914034669567, lng: -79.39904892990222, addr: "xx Bedford Rd"}, 
  {id: 40, lat: 43.577367486854435, lng: -79.63900043483339, addr: "xx Parmeer Dr"}, 
  {id: 41, lat: 44.10428261747325, lng: -79.48048264580632, addr: "xx Silk Twist Dr"}, 
  {id: 42, lat: 43.90827020366368, lng: -79.39188178069388, addr: "xx Boiton St"}, 
  {id: 43, lat: 44.00255085539824, lng: -79.48569319052925, addr: "xx Kemano Rd"}, 
  {id: 44, lat: 43.94201489667071, lng: -79.42951406189593, addr: "xx Dovetail Dr"}, 
  {id: 45, lat: 43.81600488825126, lng: -79.09993982793672, addr: "xx Leaside St"},   
  {id: 46, lat: 43.58296941812676, lng: -79.67966072370474, addr: "xx Vanrose St"}, 
  {id: 47, lat: 43.91164670887988, lng: -78.86511171200975, addr: "xx Hillcroft St"}, 
  {id: 48, lat: 43.98272402083802, lng: -79.45162815541123, addr: "xx Match Point Ct"}, 
  {id: 49, lat: 44.00059161241535, lng: -79.44436675860034, addr: "xx Milloy Pl"}, 
  {id: 50, lat: 43.87796263612783, lng: -79.29747980007113, addr: "xx Brooklyn Crescent"},   
  {id: 51, lat: 43.77353412080169, lng: -79.25499136627994, addr: "xx Town Centre Court"}, 
  {id: 52, lat: 43.71482711250238, lng: -79.44818584912294, addr: "xx Lawrence Ave W"}, 
  {id: 53, lat: 43.70268940368854, lng: -79.51348935050278, addr: "xx Wadsworth Blvd"}, 
  {id: 54, lat: 43.88153775459389, lng: -79.22507396481844, addr: "xx Arthur Bonner Ave"}, 
  {id: 55, lat: 43.70408984116449, lng: -79.52340366616224, addr: "xx Church St"}, 
  {id: 56, lat: 43.88151910855711, lng: -79.2250867980365, addr: "xx Arthur Bonner Ave"}, 
  {id: 57, lat: 44.20558397979858, lng: -79.46543225579389, addr: "xx Bill Guy Dr"}, 
  {id: 58, lat: 43.85476103997974, lng: -79.49510214628701, addr: "xx Barletta Dr"}, 
  {id: 59, lat: 44.40813435016432, lng: -79.65800883726774, addr: "xx Corbett Dr"}, 
  {id: 60, lat: 43.79581466873397, lng: -79.57899176858476, addr: "xx Pine Ridge Ave"},  
  {id: 61, lat: 43.79283266450513, lng: -79.31328334385748, addr: "xx Bridletowne Cir"}, 
  {id: 62, lat: 43.93794453827993, lng: -79.47000337757066, addr: "xx Grand Oak Dr"}, 
  {id: 63, lat: 43.88730747048038, lng: -79.2845475179541, addr: "xx Carole Bell Wy"}, 
  {id: 64, lat: 43.77517747829689, lng: -79.41118648251123, addr: "xx Grandview Way"},  
  {id: 65, lat: 43.66442854379405, lng: -79.34965504860581, addr: "xx Broadview Ave"}, 
  {id: 66, lat: 43.84932860467874, lng: -79.24194382685957, addr: "xx Phillipsen Wy"}, 
  {id: 67, lat: 43.82735211696494, lng: -79.36749633897229, addr: "xx Atwood Ct"},  
  {id: 68, lat: 43.57126736777307, lng: -79.67012365260007, addr: "xx Ironwood Ct"}, 
  {id: 69, lat: 43.83053171885206, lng: -79.38619570768013, addr: "xx Lang Rd"},  
  {id: 70, lat: 43.9092256667365, lng: -79.2701273725775, addr: "xx Chicago Ln"}, 
  {id: 71, lat: 43.78969701661499, lng: -79.24285250529975, addr: "xx Plumbrook Crescent"}, 
  {id: 72, lat: 43.81751928861361, lng: -79.32015775296951, addr: "xx Belinda Square"},
  {id: 73, lat: 43.851671082699696, lng: -79.4535602524254, addr: "xx Sanderson Crescent"},
]

const contactPost = {
  id: 'contact',
  // image: '/images/lisa.jpg',
  highlight_image: '/pexels-earth.jpg',
  tags: ['Contact us'],
  text: "Sell faster. Stage smarter.\n Impress instantly.",
}

export default function PostMap({posts}){
  const [api, setApi] = useState();
  const mapRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const scrollTo = (index) => {
    if (!api) return;
    const id = `house${positions[index].id}`;
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex != -1){
      api.scrollTo(postIndex);
    } else {
      api.scrollTo(posts.length);
    }
  }

  const flyTo = (pos, index) => {
    setActiveMarker(index);
    mapRef.current.flyTo(pos, 10, {
      animate: true,
      duration: 0.3
    });
  }

  const center = () => {
    if (mapRef && mapRef.current && positions.length > 0){
      const map = mapRef.current;
      map.fitBounds(positions.map((pos)=>[pos.lat,pos.lng]));
      const newCenter = map.containerPointToLatLng([
          map.getSize().x /2, // X remains centered
          map.getSize().y / 2 // Move up by 20 pixels
      ]);
      map.setView(newCenter, map.getZoom() - 0.3); // Adjust the zoom and set new center
      map.options.zoomSnap = 1; // Allow fractional zoom levels
    }
  }

  useEffect(()=>{
    if (!api) return;
    center();
    api.on("select", () => {
        var index = api.selectedScrollSnap();
        if(index === posts.length) return;
        var mapIndex = positions.findIndex((pos) => `house${pos?.id}` === posts[index].id);
        if (mapIndex != -1){
          flyTo([positions[mapIndex].lat,positions[mapIndex].lng], mapIndex);
        }
    })
  },[api]);
  
  return (
    <div className="container h-fit w-full max-w-sceen">
      <div className="w-full mb-10">
        <div className="relative">
          <MapContainer zoom={7} style={{ height: '300px', width: '100%' }} ref={mapRef} zoomSnap={0} className='rounded-xl mb-8'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              minZoom={7}
              className='rounded-xl'
              style={{ borderRadius: '1rem' }}
            />
            {positions.map((position, index) => 
              <Marker 
                key={position.id} 
                position={[position.lat, position.lng]}
                icon={activeMarker === index ? RedIcon : DefaultIcon}
                eventHandlers={{
                  click: () => {
                    scrollTo(index);
                    flyTo([position.lat, position.lng], index);
                  },
                }}
              >
                <Popup>{position.addr}</Popup>
              </Marker>
            )}
          </MapContainer>
          
          {/* Marker counter overlay */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md z-[1000] flex items-center">
            <span className="text-sm font-medium mr-1">Locations:</span>
            <span className="text-sm font-bold">{positions.length}</span>
          </div>
        </div>
        <div className='max-w-vw justify-center items-center flex mb- md:mb-8 w-full'>
          <Carousel setApi={setApi} className="w-[calc(100vw-28px)] lg:w-[900px] max-w-[calc(100vw-28px)] "
            // plugins={[
            //   Autoplay({
            //     delay: 5000,
            //   }),
            // ]}
          >
            <CarouselContent className='-ml-1'>
              {posts.map((post, index) => (
                <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 lg:basis-1/3 pl-1">
                  <CardDemo post={post}/>
                </CarouselItem>
              ))}
              <CarouselItem key={-1} className="sm:basis-1/2 lg:basis-1/3 pl-1">
                <CardDemo post={contactPost}/>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0'/>
          </Carousel> 
        </div>
      </div>
    </div>
  )
}