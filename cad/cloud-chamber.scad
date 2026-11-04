// Four-module water-cooled concept assembly. mm. Not fabrication-ready.
// Body dimensions from sources.json; fittings and mounting are approximate.
exploded=0; $fn=40; sep=exploded*28;
module block(w,h,d,x,y,z){translate([x-w/2,y-h/2,z-d/2])cube([w,h,d]);}
color("gray")for(z=[-24,24])block(120,12,40,0,174,z);
color("white")for(x=[-24,24])for(z=[-24,24])block(40,6.4,40,x,183.2+sep,z);
color("peru")block(100,3,100,0,187.9+2*sep,0);
color("black")block(100,.1,100,0,189.45+2*sep,0);
color("white"){
 for(x=[-37.5,37.5])block(5,.5,80,x,189.75+3*sep,0);
 for(z=[-37.5,37.5])block(70,.5,5,0,189.75+3*sep,z);
}
color("lightblue",.18){
 for(x=[-38.5,38.5])block(3,87,74,x,233.5+4*sep,0);
 for(z=[-38.5,38.5])block(80,87,3,0,233.5+4*sep,z);
 block(80,3,80,0,278.5+4*sep,0);
}
color("beige")block(62,3,62,0,273+4*sep,0);
color("lightblue",.1){
 for(x=[-78,78]){block(4,90,152,x,235,0);for(z=[-69,69])block(4,156,14,x,112,z);}
 for(z=[-78,78]){block(160,90,4,0,235,z);for(x=[-72,72])block(16,156,4,x,112,z);}
}
color("black")block(152,4,152,0,30,0);
// External AS240, and two P12 fans (simple dimensional envelopes).
color("dimgray")block(120,269,36,205,164.5,0);
color("black")for(y=[104,224])difference(){block(120,120,25,205,y,30.5);translate([205,y,15])cylinder(r=54,h=35);}
color("lightblue",.3)block(66,62,56,-135,88,0);
color("black")block(66,24,56,-135,45,0);
// Hose paths, clamps, block supports and electrical equipment are not CAD releases.
