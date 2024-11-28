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
            // id: 'ed8170af-5ba1-47ec-a5a7-e14b5468ab59',
            id: '101e57a2-f37c-4198-b361-29dd543c3048',
            embedUrl:
              // 'https://app.powerbi.com/reportEmbed?reportId=ed8170af-5ba1-47ec-a5a7-e14b5468ab59&groupId=931375e6-04ba-42c1-b554-9b9dc3018240',
              'https://app.powerbi.com/reportEmbed?reportId=101e57a2-f37c-4198-b361-29dd543c3048&groupId=931375e6-04ba-42c1-b554-9b9dc3018240&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
            accessToken:
              // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTJiYTQzNDUtNzc2NC00ZDIyLWI2YTEtN2NmNTI4ZjNiM2E1LyIsImlhdCI6MTczMjY0NzQ2NiwibmJmIjoxNzMyNjQ3NDY2LCJleHAiOjE3MzI2NTE2NDUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUFJTGMvK3R2WGt5N3N4K0l1QTJjSDNXUkNXTVkzN3pMQlNkUXdTYmswYzVvb0NYaFBPSVJyejNlNERobHNUNVh6dlhNbEREK1AxenZFdTRVNDhqOGpINXRoYk13QVVlR094YlQvd04zVWtwYz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNT05DQVlPIFBBUlJBIiwiZ2l2ZW5fbmFtZSI6IkpBSU1FIEFORFJFUyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjQ1LjE2Ny4yNTEuMTE0IiwibmFtZSI6IkpBSU1FIEFORFJFUyBNT05DQVlPIFBBUlJBIiwib2lkIjoiNjJkNTM5NTQtYzEyOC00MzNkLTg3ZjItMjg5YWMxYWEyMGM5IiwicHVpZCI6IjEwMDMzRkZGQTgyNDc1ODUiLCJyaCI6IjEuQVFZQVJVTzZvbVIzSWsyMm9YejFLUE96cFFrQUFBQUFBQUFBd0FBQUFBQUFBQUJSQVpRR0FBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjE1QUdFczJIcUg4NWI0WkNvZjJCWWQwSmk4cFI5VTBhU1hLNW5jenNieDAiLCJ0aWQiOiJhMmJhNDM0NS03NzY0LTRkMjItYjZhMS03Y2Y1MjhmM2IzYTUiLCJ1bmlxdWVfbmFtZSI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInVwbiI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInV0aSI6ImxIVXJjclR3RGtHOXgzT3FjRUZ1QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDI2In0.SSup3ThuAN9MBLm6iO16-izQeQPatZT1XsPAK8x15VXp7dGzn4hA50bCCCT2rvItnOjrmce-H7g31TsIVfuR-cf9TJygdS6cauLcFAdEcTIEP_ywEeeRPFBL_mqO9H4t0ShFFdj5gPmuG4pkk2XoftvJYEuV_K09QRXtjMnGND5_ovz5mYnvUiATBqRJeQNNQ4AAS63rbpG4c-a0XmhrVpu4zfXSShWraokPJX_Cwd-90ZP32Iub3-DakMqnzVg3C6YR-Oiv9Ln2aZsIwRcu_UAqTI8sbIFT2jqGLLZOSPOYtduvNxjCXc-o761NX5Mnmaym4hnrtTaZAQoh4lATgA',
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTJiYTQzNDUtNzc2NC00ZDIyLWI2YTEtN2NmNTI4ZjNiM2E1LyIsImlhdCI6MTczMjc1MDE0MiwibmJmIjoxNzMyNzUwMTQyLCJleHAiOjE3MzI3NTUwNDgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUE5TzVFb0toeCsvUFRqanVQU2VSd3Ria1R5NmYybUNsR2FGZmZvN1RQQ0JtTjYrUG01REpXZ2JzOWJ2R3pjM09oQmRMOGZvNFJ1NEFIWWgrMjdTcmNGZTZDNk9TdXBQK2ljanVQOUZhTGkyaz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNT05DQVlPIFBBUlJBIiwiZ2l2ZW5fbmFtZSI6IkpBSU1FIEFORFJFUyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjQ1LjE2Ny4yNTEuMTE0IiwibmFtZSI6IkpBSU1FIEFORFJFUyBNT05DQVlPIFBBUlJBIiwib2lkIjoiNjJkNTM5NTQtYzEyOC00MzNkLTg3ZjItMjg5YWMxYWEyMGM5IiwicHVpZCI6IjEwMDMzRkZGQTgyNDc1ODUiLCJyaCI6IjEuQVFZQVJVTzZvbVIzSWsyMm9YejFLUE96cFFrQUFBQUFBQUFBd0FBQUFBQUFBQUJSQVpRR0FBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjE1QUdFczJIcUg4NWI0WkNvZjJCWWQwSmk4cFI5VTBhU1hLNW5jenNieDAiLCJ0aWQiOiJhMmJhNDM0NS03NzY0LTRkMjItYjZhMS03Y2Y1MjhmM2IzYTUiLCJ1bmlxdWVfbmFtZSI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInVwbiI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInV0aSI6IlRYcEZOR0REYVU2Sk05NlZqSDhtQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDEwIn0.dbe9Gj1O5Sfud5hwBejZ48pSFlacJmpvd0MMw-9gWysJsYMj_0muBjQjXO32vmw64l9j_fE3_0ZmLt-fAgGg8RyYGoyhzZ-gwttaDq0gB3MElGIgI5mjUljO33ITH5soB6wPW0BOvlabTz9f8hAZHYKCN9aId2FlgA8C9SKHIqqZl8oVjN97XpZ5q-vvOYag8hULD4_rWeeqlgHGmyNjefmk6IQQRqIueuoA9ciW6mwgd3SnuFMji-bj_KKc4RAyamdDmCfeqPVihq477Zd_zvUKoNzn00Xsc9xtlm_AuvdlVVGLYAmOdazY5qSaFXarpEdUlOCxyDeucDyZEDZRUQ',
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
