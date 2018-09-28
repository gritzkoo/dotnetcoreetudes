using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Dynamic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EstudoDeDotNet.Controllers
{
    public class BaseController : Controller
    {
        public DefaultReturnObject Test(string ClassName, string MethodName, ExpandoObject Param)
        {
            var tipo = Type.GetType(ClassName);
            var objeto = Activator.CreateInstance(tipo, ClassName);
            var metodo = tipo.GetMethod(MethodName);
            
            return new DefaultReturnObject{
                status = true,
                response = Param,
                message = "Serviço executado com sucesso"
            };
        }
        public class DefaultReturnObject
        {
            public bool status { get; set; }
            public dynamic response { get; set; }
            public string message { get; set; }
        }
        public class Primaria
        {
            private int TonH { get; set; }
            public void Test(dynamic Param){
                this.TonH = 1;
            }
        }
    }
}
