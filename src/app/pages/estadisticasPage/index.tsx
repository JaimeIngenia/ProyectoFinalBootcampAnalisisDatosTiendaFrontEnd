import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Embed, models, Report } from 'powerbi-client';
import './styles.css';

export default function EstadisticasPage() {
  return (
    <div className="App">
      <header className="App-header">
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: 'ed8170af-5ba1-47ec-a5a7-e14b5468ab59',
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ed8170af-5ba1-47ec-a5a7-e14b5468ab59&groupId=931375e6-04ba-42c1-b554-9b9dc3018240',
            accessToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTJiYTQzNDUtNzc2NC00ZDIyLWI2YTEtN2NmNTI4ZjNiM2E1LyIsImlhdCI6MTczMjEyNzM4OCwibmJmIjoxNzMyMTI3Mzg4LCJleHAiOjE3MzIxMzE2MjIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUF6YzdMRGNXWHdkc0JuSHJwUG5YOHdmL3h6UnV3RWZHeG9oZGthOVlNNmtkcmhkbjZldnNxK3Q5UWtYdHNGUlB4NXlFZmErZmJteVE0MmRESFI0VUFkMjY1OUhzVmpnMHhGb0lKbys5MFlQUT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNT05DQVlPIFBBUlJBIiwiZ2l2ZW5fbmFtZSI6IkpBSU1FIEFORFJFUyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjQ1LjE2Ny4yNTEuMTE0IiwibmFtZSI6IkpBSU1FIEFORFJFUyBNT05DQVlPIFBBUlJBIiwib2lkIjoiNjJkNTM5NTQtYzEyOC00MzNkLTg3ZjItMjg5YWMxYWEyMGM5IiwicHVpZCI6IjEwMDMzRkZGQTgyNDc1ODUiLCJyaCI6IjEuQVFZQVJVTzZvbVIzSWsyMm9YejFLUE96cFFrQUFBQUFBQUFBd0FBQUFBQUFBQUJSQVpRR0FBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjE1QUdFczJIcUg4NWI0WkNvZjJCWWQwSmk4cFI5VTBhU1hLNW5jenNieDAiLCJ0aWQiOiJhMmJhNDM0NS03NzY0LTRkMjItYjZhMS03Y2Y1MjhmM2IzYTUiLCJ1bmlxdWVfbmFtZSI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInVwbiI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInV0aSI6Im9DbEM1dDNFSVVpVnBHNGphTlVSQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDEyIn0.tNyQGMsgJg6i3yAG91B9nAYIK5XT6xjJ-zNRzQT42JHASwLFe0UBQWv-9kBJglD6taOGEPfaoTEQj-FsCvun6kQJeTR8RpK-eZWisJZJuiteDRpKUd9JoJM3EionLWjbkcEjmv-246UwVa-5YQ06ehxXXurtrgvbzHtDuuwscEiiQErnHabkRrnDeZROexcEJ3XdT4TBlxMNPCcuC34bi9c0EeHcK_QteLY6C592W7Vgt771zMdwJhACVpNELE3Uj0UhzyHg6b_Y5sFMHb51olOl1IadUiY-ysXYd44us9mlTZtTcz9RyHvbq0BjNLQGY16Ub21E71lR1hO-f_FM5g',
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
      </header>
    </div>
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
