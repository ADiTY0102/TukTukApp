import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Start from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignUp from './pages/UserSignUp.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignUp from './pages/CaptainSignUp.jsx';
import Home from './pages/Home.jsx';
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import CaptainLogout from './pages/CaptainLogout.jsx';
import Riding from './pages/Riding.jsx';
import CaptainRiding from './pages/CaptainRiding.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/Login' element={<UserLogin />}/>
        <Route path='/SignUp' element={<UserSignUp />}/>
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-signUp' element={<CaptainSignUp />}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain/riding' element={<CaptainRiding/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }/>
        <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
        }/>

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path='/captain/logout' element={
          <UserProtectWrapper>
            <CaptainLogout />
          </UserProtectWrapper>
        } />

      </Routes>
    </div>
  );
}

export default App;
