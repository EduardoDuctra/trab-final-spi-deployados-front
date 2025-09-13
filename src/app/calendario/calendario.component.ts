import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBr from '@fullcalendar/core/locales/pt-br';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  public events: any[] = [];
  public options: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'timeGridWeek',
      defaultDate: new Date(),
      locale: ptBr,
      header: {
        right: 'prev,next',
        left: 'title',
      },
      editable: false,
      allDaySlot: false,
      slotDuration: '01:00:00',
      slotLabelInterval: '01:00:00',
      minTime: '07:30:00',
      maxTime: '22:00:00',
      height: 'auto',
    };

    this.http.get<any[]>('assets/json/compromissos.json').subscribe((data) => {
      this.events = data.map((item) => ({
        title: `${item.usuario.nome} - ${item.sala.nome}`,
        start: item.data_inicio,
        end: item.data_fim,
        description: `Status: ${item.status}`,
      }));
    });
  }
}
