import data from '../data.json'
/*************************
 *Created by: Kevin Shreve*
 *Date : 2/18/12          *
 *************************/
window.LoadJSON = function LoadJSON() {
  var store = new KPILocalStorage();

  const mappedData = data.map((point) => {
    const [[_, KPI_Name], [__,___], [_a, janValue], [_b,febValue], [_c, marchValue], [_d,aprilValue], [_e,mayValue]] =Object.entries(point);
    return [
      {
        KPI_Name: KPI_Name,
        KPI_Date: new Date(2012,0,1),
        KPI_Value: janValue,
      },
      {
        KPI_Name: KPI_Name,
        KPI_Date: new Date(2012,1,1),
        KPI_Value: febValue,
      },
      {
        KPI_Name: KPI_Name,
        KPI_Date: new Date(2012,2,1),
        KPI_Value: marchValue,
      },
      {
        KPI_Name: KPI_Name,
        KPI_Date: new Date(2012,3,1),
        KPI_Value: aprilValue,
      },
      {
        KPI_Name: KPI_Name,
        KPI_Date: new Date(2012,4,1),
        KPI_Value: mayValue,
      },
    ]
  });
  $.each(mappedData.flat(), function(i, kpi) {
      store.set(i, kpi);
  });
}

//Helper function so that we can get/set easily on the local storage
window.KPILocalStorage = function KPILocalStorage() {
  this.get = function(key) {
    return JSON.parse(window.localStorage.getItem(key));
  };
  this.set = function(key, value) {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  this.clear = function() {
    window.localStorage.clear();
  };
  this.size = function() {
    return window.localStorage.length;
  };
}

//Use To - Creates a properly formatted date out of the default ASP.NET date which looks like
// /DATE(0000000)/ and turns into Jan. 01, 2012 looking date
window.FormatDate = function FormatDate(date) {
  return new Date(date);
}

//Send in a date from the sql database so that we can do the comparison to see if any KPI's date matches your search.
window.SearchKPIByDate = function SearchKPIByDate(date) {
  var returnArr = new Array();
  var locStorage = new KPILocalStorage();

  for(var i = 0, l = locStorage.size(); i < l; i++) {
    var value = locStorage.get(i);
    if (FormatDate(value.KPI_Date).getMonth() === date.getMonth()) {
      if (FormatDate(value.KPI_Date).getFullYear() === date.getFullYear()) {
        var dataPoint = new Array(2);
        dataPoint[0] = value.KPI_Name;
        dataPoint[1] = value.KPI_Value;

        returnArr.push(dataPoint);
      }
    }
  }
  return returnArr;
}

// Allows KPI data to be more easily retrieved
window.GetKPI = function GetKPI(date, kpiName) {
  var kpiArray = SearchKPIByDate(date);
  var kpiData = "";

  for(var i = 0; i < kpiArray.length; i++) {
    if (kpiArray[i][0] == kpiName.replaceAll('_',' ')) {
      kpiData = kpiArray[i][1];
      break;
    }
  }

  return kpiData;
}

// Name: GetTrendKPI
// Author: Kevin Shreve, Lok Cheung
// Description: Get data of a KPI over months
// Remarks: this function does not deal with data for over a year
window.GetTrendKPI = function F(date, kpiName) {
  var kpiArray = new Array();
  var kpi;
  var month;
  var x = 0;
  var yy = date.getFullYear();
  var mm = date.getMonth();
  var tmpDate = new Date();
  tmpDate.setFullYear(yy, mm, 1);

  if (mm < 6) {
    x = 0;
  } else {
    x = mm - 6;
  }
  var num = mm;

  while(x <= num) {
    tmpDate.setFullYear(yy, x, 1);
    month = monthname[x];
    kpi = GetKPI(tmpDate, kpiName);
    kpiArray.push([month, kpi]);
    x++;
  }
  return kpiArray;
}
