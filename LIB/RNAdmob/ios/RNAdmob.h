
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRNAdmobSpec.h"

@interface RNAdmob : NSObject <NativeRNAdmobSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNAdmob : NSObject <RCTBridgeModule>
#endif

@end
