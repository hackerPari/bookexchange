import React from 'react';
import { PropTypes, createMetrics } from 'react-metrics';
import request from 'utils/request';
import { NODE_API_BASE_URL } from 'config';

export const analyticsConfig = {
  enabled: true,
  vendors: [
    {
      name: "Analytics",
      api: {
        pageView() {
          // console.log('page viewed');
        },
        track(eventName, value) {
          // console.log('track clicked');
          let promise = request(`${NODE_API_BASE_URL}/analytics/capture`, {
            method: 'POST',
            body: JSON.stringify({
              action: eventName,
              properties: value      
            })  
          });
        }
      }
    }  
  ]
}; 

export const ReactMetrics = createMetrics(analyticsConfig);
