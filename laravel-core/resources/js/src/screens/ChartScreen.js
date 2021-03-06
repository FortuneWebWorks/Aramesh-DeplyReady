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
import Alert from '../components/Alert';

const ChartScreen = (props) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const light = themeSession().getSession();

  useEffect(() => {
    // if (!light && loaderSession().getLoader()) {
    if (!light) {
      configSmallerLineChart.color = '#fff';
      configBigLineChart.color = '#fff';
      configBarChart.color = '#fff';
    } else {
      configSmallerLineChart.color = '#4f4f4f';
      configBigLineChart.color = '#4f4f4f';
      configBarChart.color = '#4f4f4f';
    }

    if (loaderSession().getLoader()) {
      setTimeout(() => {
        loaderSession().setLoader(false);
        forceUpdate();
        if (
          props.testCompleted &&
          !document.querySelector('.chart.line-chart')
        ) {
          lineChart(props, configSmallerLineChart);
          lineChart(props, configBigLineChart);
          epChart(props, configEpChart);
          familyChart(props, configFamilyChart);
          barChart(props, configBarChart);
        }
      }, 2000);
    }
  });

  return (
    <>
      {!props.testCompleted ? (
        <div className="container">
          <Alert text="تست خانواده کامل نیست" />
        </div>
      ) : loaderSession().getLoader() ? (
        <Spinner />
      ) : (
        <div>
          <div className="charts-container">
            <div className="table-scroll table-1">
              <h2 className="tabel-title">
                جدول نمره اعضای خانواده در ابعاد پرسشنامه ها
              </h2>
              <Table parents={props.parents} children={props.children} />
            </div>
            <div className="table-scroll table-2">
              <h2 className="tabel-title">جدول مقادیر دونفره</h2>
              <IntegrationTable {...props} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChartScreen;
