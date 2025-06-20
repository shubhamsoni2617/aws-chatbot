import * as Highcharts from "highcharts";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { transformOrgChartData } from "./helper";
import NoData from "../NoData";
import { Spin } from "antd";
import { useEffect } from "react";
import { getOrganizationChartData } from "@/store/actions";

HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
HighchartsExporting(Highcharts);

// const options = {
//     chart: {
//       height: 350,
//       inverted: true,
//       spacing: 8,
//     },
//     title: {
//       text: '',
//     },
//     series: [

//       {
//         type: 'organization',
//         name: 'Organization Chart',
//         keys: ['from', 'to'],
//         data: [
//           ['0', '1'],
//           ['0', '2'],
//           ['1', '3'],
//           ['1', '4'],
//           ['2', '5'],
//           ['3', '6'],
//           ['3', '7'],
//           ['4', '10'],
//           ['4', '11'],
//           ['5', '14'],
//           ['5', '15'],
//         ],
//         levels: [
//           {
//             level: 0,
//             color: '#471E68',
//             dataLabels: { color: '#fff' },
//             height: 25,
//           },
//           {
//             level: 1,
//             color: '#471E68',
//             dataLabels: { color: '#fff' },
//             height: 25,
//           },
//           {
//             level: 2,
//             color: '#471E68',
//             dataLabels: { color: '#fff' },
//             height: 25,
//           },
//           {
//             level: 3,
//             color: '#471E68',
//             dataLabels: { color: '#fff' },
//             height: 25,
//           },
//         ],
//         hangingSide: 'right',
//         hangingIndentTranslation: 'shrink',
//         borderRadius: 10,
//         nodes: [
//           {
//             id: '0',
//             title: 'CEO',
//             // width: 250,
//             name: '<span style="font-size: 17px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Atle Sivertsen</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg',
//           },
//           {
//             id: '1',
//             title: 'Assistant',
//             // width: 160,
//             // offset: -60,
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Gary Roberts</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg',
//           },
//           {
//             id: '2',
//             title: 'Senior Assistant',
//             // width: 160,
//             // offset: 60,
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Alex Burns</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '3',
//             title: 'Finance Manager',
//             // width: 180,
//             // offset: -20,
//             layout:'hanging',

//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Jack Smith</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '4',
//             title: 'Finance Manager',
//             // width: 180,
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Marry Smith</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '5',
//             title: 'HR Manager',
//             // width: 180,
//             // offset:30,
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Bob White</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '6',
//             title: 'IT Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">John Jones</span>',
//             layout:'hanging',
//             hangingSide:'left',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '7',
//             title: 'Marketing Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Karen Lee</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//             column:4
//           },
//           {
//             id: '10',
//             title: 'Product Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Tom Adams</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '11',
//             title: 'Support Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Will Brown</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//             column:4
//           },
//           {
//             id: '14',
//             title: 'Procurement Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Cathy Harris</span>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//           },
//           {
//             id: '15',
//             title: 'Logistics Manager',
//             name: '<span style="font-size: 15px; font-weight: 700; top: 0: 10px; white-space: nowrap;">Evan Black',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg',
//             color: '#471E68',
//             borderColor: '#fff',
//             column:4
//           },
//         ],
//         colorByPoint: false,
//         color: '#007ad0',
//         dataLabels: {
//             color: 'white'
//         },
//         borderColor: 'white',
//         nodeWidth:50
//     }],
//     tooltip: {
//         outside: true
//     },
//     exporting: {
//       buttons: {
//         contextButton: {
//           symbol: 'url(data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="black"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>)',
//           symbolSize: 24,
//           theme: {
//             style: {

//             },
//             states: {
//               hover: {
//                 fill: 'none',
//                 stroke: 'none',
//               },
//               select: {
//                 fill: 'none',
//                 stroke: 'none',
//               },
//             },
//           },
//           x: 30, // Horizontal offset
//           y: 10, // Vertical offset
//         },
//       },
//     }
//   };

//   const options2= {
//     chart: {
//         height: 500,
//         inverted: true
//     },

//     title: {
//         text: ''
//     },

//     accessibility: {
//         point: {
//             descriptionFormat: '{add index 1}. {toNode.name}' +
//                 '{#if (ne toNode.name toNode.id)}, {toNode.id}{/if}, ' +
//                 'reports to {fromNode.id}'
//         }
//     },

//     series: [{
//         type: 'organization',
//         name: 'Highsoft',
//         keys: ['from', 'to'],
//         data: [
//             ['CEO','Director1'],
//             ['CEO','Director2'],
//             ['Director1','Branch Manager'],
//             ['Director1','Zone Manager'],
//             ['Director2', 'Regional Manager'],
//             ['Branch Manager','Cluster User1'],
//             ['Branch Manager','Cluster User2'],
//             ['Branch Manager','Cluster User3'],
//             ['Branch Manager','Cluster User4'],
//             ['Zone Manager','Cluster User5'],
//             ['Zone Manager','Cluster User6'],
//             ['Zone Manager','Cluster User7'],
//             ['Zone Manager','Cluster User8'],
//         ],
//         levels: [{
//             level: 0,
//             color: '#471E68',
//             dataLabels: { color: '#fff',allowOverlap: true },
//             height: 250,
//           }, {
//             level: 1,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           }, {
//             level: 2,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           }, {
//             level: 3,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           },
//           {
//             level: 4,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           },
//           {
//             level: 5,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           },
//           {
//             level: 6,
//             color: '#471E68',
//             dataLabels: { color: '#fff'},
//             // height: 25,
//           },],

//         nodes: [ {
//             id: 'CEO',
//             title: 'CEO',
//             name: '<p style="font-size: 200px; position: absolute; top: 0;">Atle Sivertsen</p>',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2022/06/30081411/portrett-sorthvitt.jpg'
//         }, {
//             id: 'Director1',
//             title: 'Director',
//             name: 'Anne Jorunn Fjærestad',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'
//         }, {
//             id: 'Director2',
//             title: 'Director',
//             name: 'Christer Vasseng',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
//         }, {
//             id: 'Branch Manager',
//             title: 'Branch Manager',
//             name: 'Torstein Hønsi',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
//         }, {
//             id: 'Zone Manager',
//             title: 'Zone Manager',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg'
//         }, {
//             id: 'Regional Manager',
//             title: 'Regional Manager',
//             name: 'Scott Forstall',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
//         }, {
//             id: 'Cluster User1',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:4
//         },{
//             id: 'Cluster User2',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:5
//         },
//         {
//             id: 'Cluster User3',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:6
//         },{
//             id: 'Cluster User4',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:7
//         },
//         {
//             id: 'Cluster User5',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:4
//         },{
//             id: 'Cluster User6',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:5
//         },
//         {
//             id: 'Cluster User7',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:6
//         },{
//             id: 'Cluster User8',
//             title: 'Cluster User',
//             name: 'Anita Nesse',
//             image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg',
//             column:7
//         }],
//         colorByPoint: false,
//         color: '#007ad0',
//         dataLabels: {
//             color: 'white'
//         },
//         borderColor: 'white',
//         nodeWidth: 'auto',
//     }],
//     tooltip: {
//         outside: true
//     },
//     exporting: {
//         allowHTML: true,
//         sourceWidth: 800,
//         sourceHeight: 600
//     }

// };

// const mockData = {"id":338,"name":"Jaimin A Shah","job_title":"Chief Executive Officer","subordinates":[{"id":492,"name":"Johhn Doee","job_title":"Mango Manager","subordinates":[{
//   "id": 492,
//   "name": "Johhn Doee",
//   "job_title": "Mango Manager",
//   "subordinates": []
// },
// {
//   "id": 620,
//   "name": "Abhilash han",
//   "job_title": "Sales Executive",
//   "subordinates": [{
//     "id": 688,
//     "name": "Logan Ro",
//     "job_title": "Consultant",
//     "subordinates": []
// },
// {
//     "id": 1718,
//     "name": "AirBu3",
//     "job_title": "Sales Executive",
//     "subordinates": []
// }]
// },]},{"id":620,"name":"Abhilash hanii","job_title":"Sales Executive","subordinates":[]},{"id":688,"name":"Logan Roy","job_title":"Consultant","subordinates":[]},{"id":1718,"name":"AirBus43","job_title":"Sales Executive","subordinates":[]}]};

const HighChartsOrganizationCharts = () => {
  const { organizationChartData, innerFilterDepartmentIds ,isLoadingOrganizationChartData} = useAppSelector(
    (store) => store.userData
  );
  const dispatch = useAppDispatch();
  
    // const {innerFilterDepartmentIds} = useAppSelector(store => store.userData)
    useEffect(() => {
      dispatch(getOrganizationChartData({ department_id: innerFilterDepartmentIds ? String(innerFilterDepartmentIds) : ""}));
    },[innerFilterDepartmentIds])

  console.log(
    "organization chart data",
    organizationChartData,
    innerFilterDepartmentIds
  );

  if((organizationChartData?.error)) {
    return(
      <NoData />
    )
  }
  else{
    const transformedData = transformOrgChartData(organizationChartData);
    return(
      <div className="flex flex-row justify-center items-center">
      <Spin spinning={isLoadingOrganizationChartData}>
          <HighchartsReact highcharts={Highcharts} options={transformedData} />
        </Spin>
        </div>
    )
  }
  
  // const transformedData = transformOrgChartData(mockData);

  
};
export default HighChartsOrganizationCharts;
