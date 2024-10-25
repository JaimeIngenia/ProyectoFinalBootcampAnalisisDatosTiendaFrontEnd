import { Button, Result } from 'antd';
import { GeneralContainer } from 'app/components/containers';
import React from 'react';

export default function NotFoundPage() {
  return (
    <GeneralContainer>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    </GeneralContainer>
  );
}
