import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Embed, models, Report } from 'powerbi-client';
import './styles.css';
import { GeneralContainer } from 'app/components/containers';

export default function EstadisticasPage() {
  return (
    <GeneralContainer>
      <div className="App-header">
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: 'ed8170af-5ba1-47ec-a5a7-e14b5468ab59',
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ed8170af-5ba1-47ec-a5a7-e14b5468ab59&groupId=931375e6-04ba-42c1-b554-9b9dc3018240',
            accessToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTJiYTQzNDUtNzc2NC00ZDIyLWI2YTEtN2NmNTI4ZjNiM2E1LyIsImlhdCI6MTczMjUxNzg0MywibmJmIjoxNzMyNTE3ODQzLCJleHAiOjE3MzI1MjIxNTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUFNdWhYcHNpM0NyVjhtNHpyQ2FZRnpqTk9YRHNlV1VmMlc2VlVHaHBxZ0h3QkR5RGFFVWdncjdrZzN2VkYyck5YSW94RjZJR2ZlNG1ZNmxSWmtOOVB5SXAydzR4b3o1aXhSNk9YblVJWlE2bz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNT05DQVlPIFBBUlJBIiwiZ2l2ZW5fbmFtZSI6IkpBSU1FIEFORFJFUyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjQ1LjE2Ny4yNTEuMTE0IiwibmFtZSI6IkpBSU1FIEFORFJFUyBNT05DQVlPIFBBUlJBIiwib2lkIjoiNjJkNTM5NTQtYzEyOC00MzNkLTg3ZjItMjg5YWMxYWEyMGM5IiwicHVpZCI6IjEwMDMzRkZGQTgyNDc1ODUiLCJyaCI6IjEuQVFZQVJVTzZvbVIzSWsyMm9YejFLUE96cFFrQUFBQUFBQUFBd0FBQUFBQUFBQUJSQVpRR0FBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjE1QUdFczJIcUg4NWI0WkNvZjJCWWQwSmk4cFI5VTBhU1hLNW5jenNieDAiLCJ0aWQiOiJhMmJhNDM0NS03NzY0LTRkMjItYjZhMS03Y2Y1MjhmM2IzYTUiLCJ1bmlxdWVfbmFtZSI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInVwbiI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInV0aSI6ImdZdURUSHJWeFVtUDByOVRsRU5GQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDI2In0.XwXuWBpzLWH_lHnPyPr9fEYBzPfPLn8lL3iRWyDNC_8UHcjuUSJElcUf7T3_zGjsr4S2Y-uI6ZnWnq6YuSyeGonlcSPUUMQLDrPnwgecv_5JTmm_HOUT3GNJFdkXlhy9m_EDVgFuCyqsAYwO3-ALba5tx3XydvYtDpZspgKiR_ETRzh0QTugMB2FbECgcanpxtpEvnhPgdUFtuiiJEomaQdR1yrr2oqYcqmNl5cYMjYoz8nKTFJHf-po6b0rg35oV1HstE0edTipFHLyZYzbPUjKJlPh0Pt_w6LFdtARVm-_ir14jaqKleOPlIViyIQsHacIXgMpVHNxQ5qh86YacA',
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                'loaded',
                () => {
                  console.log('Report loaded');
                },
              ],
              [
                'rendered',
                () => {
                  console.log('Report rendered');
                },
              ],
              [
                'error',
                event => {
                  if (event?.detail) {
                    console.error('Error detail:', event.detail);
                  } else {
                    console.warn('Error event without details.');
                  }
                },
              ],
            ])
          }
          cssClassName={'Embed-container'}
          getEmbeddedComponent={(embeddedComponent: Embed) => {
            const embeddedReport = embeddedComponent as Report;
            window.report = embeddedReport;
          }}
        />
      </div>
    </GeneralContainer>
    // <PowerBIEmbed
    //   embedConfig={{
    //     type: 'report', // Tipo de recurso (reporte)
    //     id: 'ed8170af-5ba1-47ec-a5a7-e14b5468ab59', // El ReportId
    //     embedUrl:
    //       'https://app.powerbi.com/reportEmbed?reportId=ed8170af-5ba1-47ec-a5a7-e14b5468ab59&groupId=931375e6-04ba-42c1-b554-9b9dc3018240', // Embed URL del reporte
    //     accessToken: '<ACCESS_TOKEN>', // Reemplaza con tu token de acceso válido
    //     tokenType: models.TokenType.Embed, // Tipo de token
    //   }}
    //   cssClassName="report-style-class"
    //   getEmbeddedComponent={embeddedReport => {
    //     console.log('Reporte incrustado:', embeddedReport);
    //   }}
    // />
  );
}
