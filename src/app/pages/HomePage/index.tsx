import {
  rolesSelectorLoading,
  rolesSelector,
  categoriasSelectorLoading,
  categoriasSelector,
} from 'app/features/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSlice } from '../../features/slice';
import { Spin } from 'antd';
import { ResponseState, Entity } from 'app/features/slice/types';
import {
  LOAD_CATEGORIAS_LIST,
  LOAD_ROLES_LIST,
} from 'app/features/slice/sagaActions';
import CustomSelect from 'app/features/customSelect';
import { agregarPuntoAlFinal } from 'app/utils';
import SideBarMenuPage from 'app/features/sideBarMenuPage';
import { GeneralContainer } from 'app/components/containers';

export function HomePage() {
  const { actions } = useSlice();
  const dispatch = useDispatch();
  //Roles Selectors
  const roles = useSelector(rolesSelector);
  const loadingRoles = useSelector(rolesSelectorLoading);
  //Roles Categorias
  const categorias = useSelector(categoriasSelector);
  const loadingCategorias = useSelector(categoriasSelectorLoading);

  const [loadingSpinRoles, setLoadingSpinRoles] = useState<boolean>(false);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);
  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [roleListState, setRoleListState] = useState<Entity[]>([]);
  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  const handleSelectRoleChange = value => {
    console.log(`selected ${value}`);
  };

  const handleSelectCategoriaChange = value => {
    console.log(`selected ${value}`);
  };

  // useEffect(() => {
  //   if (firstCharge) {
  //     if (
  //       loadingRoles?.state === ResponseState.Waiting &&
  //       loadingCategorias?.state === ResponseState.Waiting
  //     ) {
  //       dispatch(actions.loadRoles(ResponseState.Started));
  //       dispatch(actions.loadCategorias(ResponseState.Started));
  //     } else if (
  //       loadingRoles?.state === ResponseState.Started &&
  //       loadingCategorias?.state === ResponseState.Started
  //     ) {
  //       setFirstCharge(false);
  //       dispatch(actions.loadRoles(ResponseState.InProgress));
  //       dispatch(actions.loadCategorias(ResponseState.InProgress));
  //       dispatch({
  //         type: LOAD_ROLES_LIST,
  //       });
  //       dispatch({
  //         type: LOAD_CATEGORIAS_LIST,
  //       });
  //     }
  //   }
  //   if (
  //     loadingRoles?.state === ResponseState.InProgress &&
  //     loadingCategorias?.state === ResponseState.InProgress
  //   ) {
  //     setLoadingSpinRoles(true);
  //     setLoadingSpinCategorias(true);
  //   } else if (
  //     loadingRoles?.state === ResponseState.Finished &&
  //     loadingCategorias?.state === ResponseState.Finished
  //   ) {
  //     if (loadingRoles?.status) {
  //       if (roles && roles.length > 0) {
  //         let dataList: Array<Entity> = [];

  //         roles?.forEach(r => {
  //           dataList.push({
  //             id: r.id,
  //             nombre: r.nombre,
  //           });
  //         });
  //         setRoleListState(dataList);
  //         if (loadingSpinRoles) setLoadingSpinRoles(false);
  //       }
  //     }
  //     if (loadingCategorias?.status) {
  //       if (categorias && categorias.length > 0) {
  //         let dataList: Array<Entity> = [];

  //         categorias?.forEach(r => {
  //           dataList.push({
  //             id: r.id,
  //             nombre: r.nombre,
  //           });
  //         });
  //         setCategoriaListState(dataList);
  //         if (loadingSpinCategorias) setLoadingSpinCategorias(false);
  //       }
  //     } else {
  //       alert(loadingRoles?.message);
  //       alert(loadingCategorias?.message);
  //     }
  //     dispatch(actions.loadRoles(ResponseState.Waiting));
  //     dispatch(actions.loadCategorias(ResponseState.Waiting));
  //   }
  // }, [roles, loadingRoles, categorias, loadingCategorias]);

  // const b = roles;
  // const a = agregarPuntoAlFinal(roles);
  // console.log('Estos son los . al final');

  // console.log(a);
  // console.log(' Este es el array roles');

  // console.log(b);

  return (
    <>
      <GeneralContainer
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   width: '100%',
      //   height: '100vh',
      //   border: 'solid red 3px',
      // }}
      >
        <h1>Home Page</h1>
        {/* <Spin spinning={loadingSpinRoles}>
        <CustomSelect
          list={roleListState}
          onChange={handleSelectRoleChange}
          label="Roles"
        />
        </Spin>
        <Spin spinning={loadingSpinCategorias}>
        <CustomSelect
        list={categoriaListState}
        onChange={handleSelectCategoriaChange}
        label="Categoría"
        />
        </Spin> */}
      </GeneralContainer>
    </>
  );
}
