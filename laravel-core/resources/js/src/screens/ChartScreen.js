import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/Table';
import IntegrationTable from '../components/IntegrationTable';
import Spinner from '../components/Spinner';
import themeSession from '../sessions/themeSession';
import loaderSession from '../sessions/loaderSession';
import {
  lineChart,
  epChart,
  familyChart,
  barChart,
  configBarChart,
  configEpChart,
  configFamilyChart,
  configBigLineChart,
  configSmallerLineChart,
} from '../charts/app';

const ChartScreen = (props) => {
  
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const light  = themeSession().getSession();
  
  useEffect(() => {
    if (!light && loaderSession().getLoader()) {
      configSmallerLineChart.color = '#fff';
      configBigLineChart.color = '#fff';
      configBarChart.color = '#fff';
    } else {
      configSmallerLineChart.color = '#4f4f4f';
      configBigLineChart.color = '#4f4f4f';
      configBarChart.color = '#4f4f4f';
    }

    if(loaderSession().getLoader()) {
      setTimeout(() => {
        loaderSession().setLoader(false);
        forceUpdate()        
        if(!document.querySelector('.chart.line-chart')) {
          lineChart(props, configSmallerLineChart);
          lineChart(props, configBigLineChart);
          epChart(props, configEpChart);
          familyChart(props, configFamilyChart);
          barChart(props, configBarChart);
        }
      }, 1000);
    }
  });



  return (
    <>
      {loaderSession().getLoader() ? <Spinner/> : (
        <div>
          <div className="charts-container">
            <div className="table-scroll table-1">
              <Table parents={props.parents} children={props.children}/>
            </div>
            <div className="table-scroll table-2">
              <IntegrationTable {...props}/>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ChartScreen;
