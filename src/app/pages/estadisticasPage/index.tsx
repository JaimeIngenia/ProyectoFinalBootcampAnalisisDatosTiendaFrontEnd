import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Embed, models, Report } from 'powerbi-client';
import './styles.css';
import { GeneralContainer } from 'app/components/containers';

export default function EstadisticasPage() {
  return (
    <GeneralContainer>
      <header className="App-header">
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: 'ed8170af-5ba1-47ec-a5a7-e14b5468ab59',
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ed8170af-5ba1-47ec-a5a7-e14b5468ab59&groupId=931375e6-04ba-42c1-b554-9b9dc3018240',
            accessToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTJiYTQzNDUtNzc2NC00ZDIyLWI2YTEtN2NmNTI4ZjNiM2E1LyIsImlhdCI6MTczMjEzMzgwNywibmJmIjoxNzMyMTMzODA3LCJleHAiOjE3MzIxMzkyNDIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WUFBQUFEN3hrMDNWcGMwQk4xbWRpL2JObkNNWCs2Mk90cVBZZmhRUXljTHlCL05HSFJrRGFjSDR1VC95bVNHM0pycXlVOExrTW9mdU4zSm9qcFcwQ2N4WGpnQ2ovWm9naGNTY29xSWN3OE9EcmY0ND0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNT05DQVlPIFBBUlJBIiwiZ2l2ZW5fbmFtZSI6IkpBSU1FIEFORFJFUyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5MS4xNTYuNDIuMTAzIiwibmFtZSI6IkpBSU1FIEFORFJFUyBNT05DQVlPIFBBUlJBIiwib2lkIjoiNjJkNTM5NTQtYzEyOC00MzNkLTg3ZjItMjg5YWMxYWEyMGM5IiwicHVpZCI6IjEwMDMzRkZGQTgyNDc1ODUiLCJyaCI6IjEuQVFZQVJVTzZvbVIzSWsyMm9YejFLUE96cFFrQUFBQUFBQUFBd0FBQUFBQUFBQUJSQVpRR0FBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjE1QUdFczJIcUg4NWI0WkNvZjJCWWQwSmk4cFI5VTBhU1hLNW5jenNieDAiLCJ0aWQiOiJhMmJhNDM0NS03NzY0LTRkMjItYjZhMS03Y2Y1MjhmM2IzYTUiLCJ1bmlxdWVfbmFtZSI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInVwbiI6ImphaW1lbW9uY2F5bzI2NTgxNEBjb3JyZW8uaXRtLmVkdS5jbyIsInV0aSI6IjJvLWp0Z1A1bFVDYkxiU2NjcWdsQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDIifQ.U9NJp2J7oL8cuaPPHjdpqZE8KaqeeO_jlq3RX93MK3zXxBz2h103D8N1JtcvcLIrZHMh8AQcOgpX2hL0jtCxipfu1DW_42a4GiJT6UXn-suSaCpmzPGGmyQONh6vCAubKULpTc5QEr78fS7X5gJPDBi6-xI7YFGA1RomAi7ZlUx5y3DVy2Q47u9fwbNI5btY1cWzMiU922oYrF4Te1DwgycEBY04WwhDj-93D5hXSDRsjsnBzNkQekOS9K9ZDaq7Y5sQthXGYKG_ZCNc9KchqnArFvNuQAzqgopwfwyfcNqBgXyFFeEbyE5YDmxTdQlSInhshR1ab_jZqtuXXGZD6g',
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
