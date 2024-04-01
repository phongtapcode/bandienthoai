import React from 'react';
import { Spin } from 'antd';

function Loading ({children,isLoading,delay = 200}) {

    return (
    <Spin spinning={isLoading}>
        {children}
    </Spin>
    )
}

export default Loading;