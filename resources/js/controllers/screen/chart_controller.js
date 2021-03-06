import { Controller } from 'stimulus';
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

export default class extends Controller {

    /**
     *
     */
    connect() {
        this.chart = new Chart(this.data.get('parent'), {
            title: this.data.get('title'),
            data: {
                labels: JSON.parse(this.data.get('labels')),
                datasets: JSON.parse(this.data.get('datasets')),
            },
            type: this.data.get('type'),
            height: this.data.get('height'),

            colors: JSON.parse(this.data.get('colors')),
        });

        //@see https://github.com/frappe/charts/issues/212
        this.chart.unbindWindowEvents();

        $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', () => {
            this.chart.draw();
        });
    }

    /**
     *
     */
    export() {
        this.chart.export();
    }

}
