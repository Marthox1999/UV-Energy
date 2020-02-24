/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create  map
//import L from 'leaflet';
import {
  Map,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import 'leaflet/dist/leaflet.css';
// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

class LMaps extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
              <Map
                id="map-canvas"
                style={{width: '100%',height: '400px'}}
                center={[3.430283815687804, 283.48211288452154]}
                zoom={12}
                >
              <TileLayer
                attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
                url={'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}
              />
              </Map>
                {/*<MapWrapper
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{ height: `600px` }}
                      className="map-canvas"
                      id="map-canvas"
                    />
                  }
                  mapElement={
                    <div style={{ height: `100%`, borderRadius: "inherit" }} />
                  }
                />*/}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default LMaps;
