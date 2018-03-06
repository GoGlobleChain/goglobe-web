// 空投页账号激活状态页 zhaoyue
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Button } from 'react-bootstrap';
// import { browserHistory } from 'react-router';

import { asyncActive } from './AirDropUtil.js';

export default class AirDropActiveState extends Component {

    static propTypes = {
        params: PropTypes.object
    };
    componentWillMount() {
        let itemArr = [];
        if (__CLIENT__) {
            console.log(location.search, location.search.substring(1));
            const qs = location.search.length > 0 ? location.search.substring(1) : '';
            const items = qs.length > 0 ? qs.split('&') : [];
            itemArr = items.map((item) => {
                return decodeURIComponent(item.split('=')[1]);
            });
        }
        const account = itemArr[0];
        const data = {
            account: account
        };
        asyncActive(data).then(response => response.json()).then((res) => {
            if (res.status === 'success') {
                this.setState({
                    account: res.goglobe.account,
                    status: res.goglobe.status
                });
            }
        });
    }
    // // 发送邮件激活账号
    // clickToActive: Function = (account) => {
    //     const data = {
    //         account: account
    //     };
    //     asyncActive(data).then(response => response.json()).then((res) => {
    //         if (res.status === 'success') {
    //             browserHistory.replace('/airdrop/state?account=' + res.goglobe.account + '&code=' + res.goglobe.code + '&status=' + res.goglobe.status + '&email=' + res.goglobe.email);
    //         }
    //     });
    // }
    render() {
        return (
            <div className="air-drop height">
                <Helmet>
                    <title>Go Globe Chain</title>
                </Helmet>
                <div className="center-form">
                    <div className="air-state-logo">
                        <img src={require('img/logo4.png')} />
                    </div>
                    <div className="block">
                        <h1>SORRY!</h1>
                        <p>You have already verified your E-mail</p>
                        <Button onClick={() => this.clickToActive()}>Back to Homepage</Button>
                    </div>
                </div>
            </div>
        );
    }
}
