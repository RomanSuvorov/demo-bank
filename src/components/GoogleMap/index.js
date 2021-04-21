import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import GoogleMapAPI, { fitBounds } from 'google-map-react';

import { Loading } from '../Loading';
import { useIsMounted } from '../../sdk/helper';
import { PinIcon } from '../../assets/icons';
import './index.css';

const mapOptions = ({ ControlPosition, ...props }) => {

  return {
    mapTypeControl: false,
    minZoom: 1,
    zoomControl: true,
    zoomControlOptions: {
      position: ControlPosition && ControlPosition.RIGHT_BOTTOM,
    },
    controlSize: 32,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#44484d"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#f6a508"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f6a508"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#44484d"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#44484d"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#f6a508"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f6a508"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#22272d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "invert_lightness": true
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ],
  };
};

const getSize = () => {
  const map = document.getElementsByClassName('googleMap')[0];
  if (map) {
    const { width, height } = map.getBoundingClientRect();
    return { width, height };
  }
};

const bound = {
  nw: {
    lat: 60.0,
    lng: -90.000
  },
  se: {
    lat: -20.0,
    lng: 90.000
  },
};

const Pin = () => <PinIcon className={"pin"} />;

export default function GoogleMap() {
  const { pinLoading, pinList, pinError } = useSelector(state => state.app);
  const [loadingMap, setLoadingMap] = useState(true);
  const [state, setState] = useState({
    center: undefined,
    zoom: undefined,
    calculated: false,
  });
  const isMounted = useIsMounted();
  const { t } = useTranslation('translation');

  useEffect(() => {
    if (isMounted) {
      const { width, height } = getSize();
      const { center, zoom } = fitBounds(bound, { width, height: height - 52 });

      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          center: center,
          zoom: zoom,
          calculated: true,
        }));
      }, 1000);
    }

    return () => {
      if (isMounted) setState({ center: undefined, zoom: undefined, calculated: false });
    }
  }, [isMounted]);

  const { center, zoom, calculated } = state;

  if (pinError) {
    // TODO: create Error Component;
    return <div className={"googleMap"}>Error</div>;
  }

  if (pinLoading || !calculated || !center) {
    return (
      <div className={"googleMap"}>
        <div className={"googleMap_title"}>
          <span>{t('exchange.map.title')}</span>
        </div>
        <div className={"googleMap_map"}>
          <Loading text={'Pins loading'} withDots />
        </div>
      </div>
    );
  }

  return (
    <div className={"googleMap"}>
      <div className={"googleMap_title"}>
        <span>{t('exchange.map.title')}</span>
      </div>
      <div className={"googleMap_map"}>
        {
          loadingMap && (
            <Loading text={'Tiles loading'} withDots block />
          )
        }
        <GoogleMapAPI
          bootstrapURLKeys={{ key: "AIzaSyAxbGTRaQhqN7MLd7_ezh69qtHQN1SEN2w" }}
          defaultCenter={center}
          defaultZoom={zoom ? zoom : 2}
          options={mapOptions}
          yesIWantToUseGoogleMapApiInternals
          onTilesLoaded={() => {
            setTimeout(() => setLoadingMap(false), 1000)
          }}
        >
          {
            pinList.map(({ lat, lng, title, description }) => (
              <Pin
                key={`${lng + lat}`}
                title={title}
                descriptipn={description}
                lat={lat}
                lng={lng}
              />
            ))
          }
        </GoogleMapAPI>
      </div>
    </div>
  );
}
