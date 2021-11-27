/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import themeSession from './src/sessions/themeSession'
import loaderSession from './src/sessions/loaderSession';


// import QuestionsContextProvider from './context/QuestionsContext'
// import AlertsContextProvider from './context/AlertsContext'
// import RegisterContextProvider from './context/RegisterContext'
// import ThemeContextProvider from './context/ThemeContext'
// import Spinner from './components/Spinner'
// import LoadingContextProvider from './context/LoadingContext'

if(themeSession().getSession() === null) {
    themeSession().setSession(true);
} else {
    themeSession().setTheme();
}
loaderSession().setLoader(true);

createInertiaApp({
    resolve: name => require(`./src/screens/${name}`).default,
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})
