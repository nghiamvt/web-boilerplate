import Loading from '@/components/loading';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Todo = lazy(() => import('@/pages/todo'));

function routers() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading isLoading />}>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route component={() => <div>404 Not found</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default routers;
