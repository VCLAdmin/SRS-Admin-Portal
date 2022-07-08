import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconstantsService {

  constructor() { }

  public readonly APP_BASIC_ROUTE: string = '/app';
  public readonly API_BASIC_ROUTE: string = '/api';
  public readonly DEFAULT_GUID: string = '00000000-0000-0000-0000-000000000000';
  public CURRENT_CULTURE: string = 'EN-US';
  public readonly MAX_SAFE_INTEGER: number = 2147483647;
  public readonly GOOGLE_API_KEY: string = 'AIzaSyCOOGBpQ9b2Y3DSed1gm4dXGTue2f2y0-E';

  //API Servers
  // public readonly APP_DOMAIN: string = 'https://localhost:58119/';                           // API localhost server
  // public readonly APP_DOMAIN: string = 'https://api.srs.vcldesign.com/';                    // API PROD server
  public readonly APP_DOMAIN: string = 'https://srsapitest.vcldesign.com/';                    // Test server
  // public readonly APP_DOMAIN: string = 'https://apiwebtest.vcldesign.com/';                 // Test server
  // public readonly APP_DOMAIN: string = 'https://apiweb.vcldesign.com/';                     // API PROD servers

  //PhysicsCore Servers
  // public readonly PHYSICS_CORE_DOMAIN: string = 'http://localhost:51558/';                  // API localhost server
  // public readonly PHYSICS_CORE_DOMAIN: string = 'https://physicscore.vcldesign.com/';       // PC API PROD server
  public readonly PHYSICS_CORE_DOMAIN: string = 'https://test.physicscore.vcldesign.com/';     // PC Test server
  // public readonly PHYSICS_CORE_DOMAIN: string = 'https://test.physicscore.vcldesign.com/';  // PC Test server
  // public readonly PHYSICS_CORE_DOMAIN: string = 'https://physicscore.vcldesign.com/';       // PC PROD servers

  //PhysicssCore ClientId & Secretkey
  public readonly PHYSICS_CORE_CLIENTID: string = 'a8b02c5a-6b63-4266-ba15-8a54f6b001f5';
  public readonly PHYSICS_CORE_CLIENTSECRET: string = '3*iloj-_2oe27@0v#pu!pvplpry#l+jm1j*cn+$6&vp4@mw=lw';
}
